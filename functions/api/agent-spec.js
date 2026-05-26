// Cloudflare Pages Function: POST /api/agent-spec
// Body: { business: string, workflow: string }
// Returns: { agent_name, one_line, weekly_hours_saved, ship_days, monthly_revenue_impact, first_action }
//
// Calls Anthropic's API with a server-side key from the ANTHROPIC_API_KEY
// environment variable (set in Cloudflare Pages → Settings → Environment variables).

export async function onRequestPost({ request, env }) {
  try {
    if (!env.ANTHROPIC_API_KEY) {
      return json({ error: 'Server missing ANTHROPIC_API_KEY' }, 500);
    }

    // Rate limit per client IP. Soft-fails open if RATE_LIMIT KV binding
    // isn't configured — better to over-serve than block real users.
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const rl = await checkRateLimit(env, ip);
    if (!rl.ok) {
      return json(
        { error: `Rate limit exceeded (per-${rl.reason} cap). Try again shortly.` },
        429,
        { 'retry-after': String(rl.retryAfter) },
      );
    }

    const body = await request.json().catch(() => ({}));
    const business = String(body.business || '').slice(0, 500).trim();
    const workflow = String(body.workflow || '').slice(0, 500).trim();

    if (business.length < 4 || workflow.length < 4) {
      return json({ error: 'business and workflow are required' }, 400);
    }

    const prompt = `You are a senior automation engineer at Heck Holdings, an AI agent consultancy for small and mid-sized businesses. A visitor has told you about their business and a painful workflow. Propose ONE realistic, concrete autonomous AI agent.

Business: ${business}
Painful workflow: ${workflow}

Return ONLY a JSON object — no markdown, no commentary, no code fences — with exactly these keys:
- agent_name: 1-2 word product name in PascalCase, evocative of the work (examples: "Mailroom", "ProposalForge", "ScoutCrawler", "Reconcile", "FrontDesk")
- one_line: single sentence, max 18 words, plain language describing what the agent does
- weekly_hours_saved: integer between 6 and 30
- ship_days: integer between 12 and 35
- monthly_revenue_impact: string formatted "+$X,XXX" (e.g. "+$8,200")
- first_action: single sentence describing what the agent does on its first day in production

Be specific to the business and workflow described. No generic AI slop.`;

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.warn('Anthropic API error', apiRes.status, errText);
      return json({ error: 'Upstream API error' }, 502);
    }

    const data = await apiRes.json();
    const raw = data?.content?.[0]?.text || '';
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      return json({ error: 'Could not parse model response' }, 502);
    }

    let spec;
    try {
      spec = JSON.parse(match[0]);
    } catch (e) {
      return json({ error: 'Invalid JSON from model' }, 502);
    }

    return json(spec, 200);
  } catch (e) {
    console.error('agent-spec function error', e);
    return json({ error: 'Server error' }, 500);
  }
}

function json(data, status, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...extraHeaders,
    },
  });
}

// Cloudflare native Rate Limiting binding. Strongly consistent within a
// colo, atomic increment, sub-millisecond. Configured in wrangler.toml as
// 5 requests per 60-second window. To adjust the cap, edit the `simple`
// block in wrangler.toml — no code change needed.
//
// Fails OPEN if the binding is missing (e.g. local dev) rather than
// blocking real users.
async function checkRateLimit(env, ip) {
  if (!env.RATE_LIMIT || ip === 'unknown') return { ok: true };
  try {
    const { success } = await env.RATE_LIMIT.limit({ key: ip });
    if (!success) return { ok: false, retryAfter: 60, reason: 'minute' };
    return { ok: true };
  } catch (e) {
    console.warn('Rate limit check failed, failing open', e);
    return { ok: true };
  }
}
