const GROK_TEMPLATES = [
  { tag: 'Grok Bot template', color: '#c4b5fd', name: 'Rematch', meta: 'Free · import in one tap',
    body: 'Finds every stalled email, quiet lead and open loop, then drafts the follow-up. Nothing sends without your OK.',
    href: 'https://x.ai/bot/_abcO9nWji9H9yX1r9XGV', cta: 'Get Rematch' },
  { tag: 'Grok Bot template', color: '#c4b5fd', name: 'Cut Man', meta: 'Free · import in one tap',
    body: 'Finds forgotten subscriptions, surprise renewals and price hikes, and drafts cancellations for your approval.',
    href: 'https://x.ai/bot/8q0BDryA7qBsMmrXGoypO', cta: 'Get Cut Man' },
  { tag: 'Grok Bot template', color: '#c4b5fd', name: 'Hype Man', meta: 'Free · import in one tap',
    body: 'Celebrates your wins, keeps momentum up and holds you accountable, matching its energy to your day.',
    href: 'https://x.ai/bot/QVYB4aI8lO8-LgCNmFblE', cta: 'Get Hype Man' },
  { tag: 'Grok Bot template', color: '#c4b5fd', name: 'Explainer Video Bot', meta: 'Free · import in one tap',
    body: 'Makes upload-ready, data-driven explainer videos with verified numbers, AI voice-over, motion graphics and real footage.',
    href: 'https://x.ai/bot/zxq6r61p79vJz0o1jZ8rE', cta: 'Get Explainer Video Bot' },
  { tag: 'Grok Bot template', color: '#c4b5fd', name: 'Startup Grant Scout', meta: 'Free · import in one tap',
    body: 'Finds open, non-dilutive grants your startup can actually win, scores each on fit, and drafts applications for your approval.',
    href: 'https://x.ai/bot/BAI6spVv_6v3ZVMFM3i6Q', cta: 'Get Startup Grant Scout' },
  { tag: 'Grok Bot template', color: '#c4b5fd', name: 'Scorecard', icon: '🥊', meta: 'Free · import in one tap',
    credit: 'Michael',
    body: 'Every Monday, scores your last week on X like a fight against your 4-week baseline, with up to 3 fixes.',
    href: 'https://x.ai/bot/tEsWijg6kaDbi-3aY6who', cta: 'Copy template' },
  // Distill — placeholder until a public template link exists.
  // { tag: 'Grok Bot template', color: '#c4b5fd', name: 'Distill', meta: 'Free · import in one tap',
  //   body: 'One source in, ten ready-to-post drafts out in your voice for X, LinkedIn and your newsletter. Nothing posts without your OK.',
  //   href: 'https://x.ai/bot/<DISTILL_ID>', cta: 'Get Distill' },
];

export default function GrokTemplates() {
  return (
    <section id="grok-templates" className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Grok Bot Templates</span>
          <h2>Grok Bot templates<br/><span style={{ color: 'var(--fg-3)' }}>— free agents you can import in one tap.</span></h2>
          <p className="lead">
            Ready-made Grok Bot agents we built and use ourselves. Open a link to import the template into your own Grok Bot.
          </p>
        </div>
        <div className="prod-grid">
          {GROK_TEMPLATES.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noreferrer" className="card prod-card">
              <span className="chip" style={{ borderColor: p.color, color: p.color, alignSelf: 'flex-start' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.color }} />
                {p.tag}
              </span>
              {p.icon ? (
                <span aria-hidden="true" style={{ fontSize: 28, lineHeight: 1, marginTop: 16 }}>{p.icon}</span>
              ) : null}
              <h3 style={{ fontSize: 22, fontWeight: 600, marginTop: p.icon ? 10 : 16 }}>{p.name}</h3>
              <p className="mono" style={{ color: 'var(--fg-3)', marginTop: 4, fontSize: 11 }}>{p.meta}</p>
              {p.credit ? (
                <p className="mono" style={{ color: 'var(--fg-3)', marginTop: 4, fontSize: 11 }}>by {p.credit}</p>
              ) : null}
              <p style={{ color: 'var(--fg-2)', marginTop: 14, fontSize: 14, lineHeight: 1.5, flex: 1 }}>{p.body}</p>
              <span className="mono" style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line-soft)', fontSize: 12, color: 'var(--fg)' }}>{p.cta} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
