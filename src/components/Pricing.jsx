import Icon from './Icon.jsx';

const DELIVERABLES = [
  {
    icon: 'bolt',
    title: 'A working agent, in production',
    desc: 'Not a prototype, not a demo environment. Running on your real stack, on your real data, doing the job on day ten.',
  },
  {
    icon: 'shield',
    title: 'Live in 10 days or it is free',
    desc: "If it is not in production on day ten, you pay nothing and keep everything we built. We take the delivery risk, not you.",
  },
  {
    icon: 'doc',
    title: 'Scope fixed in writing',
    desc: 'Exactly what the agent does, what it touches, and what counts as done — agreed before day one. Nothing to renegotiate later.',
  },
  {
    icon: 'workflow',
    title: 'Runbook + handoff walkthrough',
    desc: 'A live walkthrough and written runbook so your team knows how it works, how to pause it, and what to do if it misbehaves.',
  },
  {
    icon: 'chart',
    title: 'Before-and-after numbers',
    desc: 'We measure the workflow before we touch it and again after go-live, so the ROI is a measurement rather than a promise.',
  },
  {
    icon: 'plug',
    title: '30-day watch window',
    desc: 'We monitor it for a month after launch and fix anything that drifts. No new invoice, no support ticket queue.',
  },
];

const TIMELINE = [
  {
    days: '01–02',
    title: 'Scope & lock',
    body: 'We pick the one workflow, map every trigger and edge case, and write the scope down. You sign off before a line of code exists.',
  },
  {
    days: '03–06',
    title: 'Build',
    body: 'We build the agent against your real tools. You watch progress in a shared board — no black box, no status meetings.',
  },
  {
    days: '07–08',
    title: 'Integrate & test',
    body: 'Connected to your live stack and run against real cases. We break it on purpose so it does not break on you later.',
  },
  {
    days: '09',
    title: 'Go live',
    body: 'The agent takes over the workflow in production, with a human escalation path behind it from the first minute.',
  },
  {
    days: '10',
    title: 'Handoff & numbers',
    body: 'Runbook, walkthrough, and the before-and-after measurement. Then a 30-day window where we watch it for you.',
  },
];

export default function Pricing() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>06 — Start here</span>
          <h2>Ten days. One agent.<br /><span style={{ color: 'var(--fg-3)' }}>Live in production, or free.</span></h2>
          <p className="lead">
            Most AI projects die in the assessment phase. This one skips it. We pick the single most expensive repetitive workflow in your business and put an agent on it in ten business days — for a fixed $1,950. If it is not running in production on day ten, you do not pay.
          </p>
        </div>

        {/* ── Price hero + Timeline ── */}
        <div className="pricing-top">
          {/* Left — pricing card */}
          <div className="card pricing-card">
            <div className="pricing-glow" aria-hidden="true" />
            <div style={{ position: 'relative' }}>
              <div className="flex gap-3" style={{ alignItems: 'center', marginBottom: 20 }}>
                <span className="chip" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-dot 2s infinite' }} />
                  First Agent Sprint
                </span>
                <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 11 }}>fixed scope · fixed price · guaranteed</span>
              </div>

              <div className="pricing-price-row">
                <div>
                  <div className="pricing-price">$1,950</div>
                  <div className="mono" style={{ color: 'var(--accent)', fontSize: 12, marginTop: 4 }}>
                    50% up front · 50% on go-live
                  </div>
                </div>
                <div className="pricing-divider" />
                <div>
                  <div className="pricing-days">10</div>
                  <div className="mono" style={{ color: 'var(--fg-2)', fontSize: 12, marginTop: 4 }}>
                    business days
                  </div>
                </div>
              </div>

              <p style={{ marginTop: 28, color: 'var(--fg-2)', fontSize: 16, lineHeight: 1.6 }}>
                One workflow. One agent. Running on your stack in ten business days — <em style={{ color: 'var(--fg)' }}>or you don't pay a cent</em>. We are taking three founding clients at this price to build local case studies. Two slots left.
              </p>

              <div className="pricing-cta-row">
                <button className="btn btn-primary" onClick={scrollToContact}>
                  Start with a free teardown
                  <Icon name="arrow-right" size={16} />
                </button>
                <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 11.5 }}>
                  20-min call first · we'll tell you if it's not worth automating
                </span>
              </div>

              <div className="pricing-trust">
                {[
                  'Fixed fee — no hourly billing',
                  'Live in 10 business days or you pay nothing',
                  'Scope agreed in writing before day one',
                ].map((t, i) => (
                  <div key={i} className="pricing-trust-item">
                    <Icon name="check" size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — timeline card */}
          <div className="card pricing-timeline-card">
            <div style={{ padding: '28px 28px 8px' }}>
              <span className="eyebrow"><span className="dot"></span>Your week</span>
              <h3 style={{ marginTop: 14, fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                Ten days, start to finish
              </h3>
              <p style={{ marginTop: 10, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.5 }}>
                No meetings-about-meetings. Every day has a clear purpose and a visible output.
              </p>
            </div>

            <div className="pricing-timeline">
              {TIMELINE.map((step, i) => (
                <div key={i} className="pricing-tl-step">
                  <div className="pricing-tl-left">
                    <div className="pricing-tl-dot" />
                    {i < TIMELINE.length - 1 && <div className="pricing-tl-line" />}
                  </div>
                  <div className="pricing-tl-content">
                    <div className="mono" style={{ color: 'var(--accent)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                      Day {step.days}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, marginTop: 6, letterSpacing: '-0.01em' }}>
                      {step.title}
                    </div>
                    <p style={{ marginTop: 8, color: 'var(--fg-2)', fontSize: 13.5, lineHeight: 1.5 }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Deliverables grid ── */}
        <div className="pricing-deliv-section">
          <div className="pricing-deliv-head">
            <span className="eyebrow"><span className="dot"></span>What you walk away with</span>
            <h3 style={{ marginTop: 14, fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, letterSpacing: '-0.025em' }}>
              What you actually get.
            </h3>
            <p style={{ marginTop: 12, color: 'var(--fg-2)', fontSize: 15.5, lineHeight: 1.55, maxWidth: 640 }}>
              No slide decks, no roadmaps, no phase two. The deliverable is a thing that runs.
            </p>
          </div>

          <div className="pricing-deliv-grid">
            {DELIVERABLES.map((d, i) => (
              <div key={i} className="card pricing-deliv-card">
                <div className="flex between" style={{ alignItems: 'flex-start', marginBottom: 20 }}>
                  <span style={{
                    width: 42, height: 42, borderRadius: 10,
                    background: 'var(--bg-2)',
                    display: 'grid', placeItems: 'center', color: 'var(--accent)',
                    border: '1px solid var(--line-soft)',
                  }}>
                    <Icon name={d.icon} size={20} />
                  </span>
                  <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 10, letterSpacing: '0.14em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{d.title}</h4>
                <p style={{ color: 'var(--fg-2)', marginTop: 10, fontSize: 14, lineHeight: 1.5 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Implementation plan callout ── */}
        <div className="pricing-impl">
          <div className="pricing-impl-glow" aria-hidden="true" />
          <div style={{ position: 'relative' }}>
            <span className="eyebrow"><span className="dot"></span>After go-live</span>
            <h3 style={{ marginTop: 18, fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
              Shipping it is the easy part — <span style={{ color: 'var(--accent)' }}>keeping it working is the job.</span>
            </h3>
            <p style={{ marginTop: 16, color: 'var(--fg-2)', fontSize: 16, lineHeight: 1.6, maxWidth: 720 }}>
              An agent nobody maintains quietly rots. Operate starts from $600/month once your first agent is live — and it is free for your first month if you start it on go-live day.
            </p>

            <div className="pricing-impl-grid">
              {[
                {
                  n: '01',
                  title: 'Monitoring & evals',
                  body: 'We watch the agent 24/7 and run evals against real cases, so drift gets caught by us rather than by your customers.',
                },
                {
                  n: '02',
                  title: 'One improvement a month',
                  body: 'Every month the agent handles one more edge case, or one more step of the workflow. It gets better instead of staler.',
                },
                {
                  n: '03',
                  title: 'A monthly written brief',
                  body: 'What it handled, what it escalated, what it saved you, and what we are changing next. Written, not dashboarded.',
                },
                {
                  n: '04',
                  title: 'The next agent, cheaper',
                  body: 'Once the plumbing exists, agent number two costs a fraction of the first. Most clients add their second within 90 days.',
                },
              ].map((item, i) => (
                <div key={i} className="pricing-impl-item">
                  <span className="pricing-impl-num">{item.n}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>
                      {item.title}
                    </div>
                    <p style={{ marginTop: 8, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.5 }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pricing-impl-cta">
              <button className="btn btn-primary" onClick={scrollToContact}>
                Book your free 20-min teardown
                <Icon name="arrow-right" size={16} />
              </button>
              <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 11.5 }}>
                No cost, no commitment — you keep the written teardown either way.
              </span>
            </div>
          </div>
        </div>
      </div>

      <PricingStyles />
    </section>
  );
}

function PricingStyles() {
  return (
    <style>{`
      /* ── Top grid: price card + timeline ── */
      .pricing-top {
        display: grid;
        grid-template-columns: 1.15fr 0.85fr;
        gap: 18px;
        margin-bottom: 80px;
      }
      @media (max-width: 980px) {
        .pricing-top { grid-template-columns: 1fr; }
      }

      /* ── Price card ── */
      .pricing-card {
        padding: clamp(32px, 4vw, 48px);
        position: relative;
        overflow: hidden;
      }
      .pricing-glow {
        position: absolute; inset: 0;
        background: radial-gradient(500px circle at 100% 0%, var(--accent-glow), transparent 55%);
        opacity: 0.55;
        pointer-events: none;
      }
      .pricing-price-row {
        display: flex;
        align-items: flex-end;
        gap: clamp(24px, 3vw, 40px);
        margin-top: 28px;
        padding-bottom: 28px;
        border-bottom: 1px solid var(--line-soft);
      }
      .pricing-price {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: clamp(56px, 7vw, 84px);
        letter-spacing: -0.045em;
        line-height: 0.9;
        color: var(--accent);
        text-shadow: 0 0 48px var(--accent-glow);
      }
      .pricing-divider {
        width: 1px;
        height: 64px;
        background: var(--line-soft);
        flex-shrink: 0;
      }
      .pricing-days {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: clamp(48px, 6vw, 72px);
        letter-spacing: -0.045em;
        line-height: 0.9;
        color: var(--fg);
      }
      .pricing-cta-row {
        margin-top: 32px;
        display: flex;
        align-items: center;
        gap: 18px;
        flex-wrap: wrap;
      }
      .pricing-trust {
        margin-top: 28px;
        padding-top: 22px;
        border-top: 1px solid var(--line-soft);
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .pricing-trust-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        color: var(--fg-2);
      }

      /* ── Timeline card ── */
      .pricing-timeline-card {
        overflow: hidden;
        background: var(--bg);
      }
      .pricing-timeline {
        padding: 18px 28px 28px;
      }
      .pricing-tl-step {
        display: grid;
        grid-template-columns: 28px 1fr;
        gap: 16px;
        min-height: 0;
      }
      .pricing-tl-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 2px;
      }
      .pricing-tl-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--accent);
        box-shadow: 0 0 0 4px color-mix(in oklab, var(--accent) 20%, transparent), 0 0 16px var(--accent-glow);
        flex-shrink: 0;
      }
      .pricing-tl-line {
        width: 1px;
        flex: 1;
        background: linear-gradient(180deg, var(--accent), var(--line-soft));
        margin: 6px 0;
      }
      .pricing-tl-content {
        padding-bottom: 24px;
      }
      .pricing-tl-step:last-child .pricing-tl-content {
        padding-bottom: 0;
      }

      /* ── Deliverables grid ── */
      .pricing-deliv-section {
        margin-bottom: 80px;
      }
      .pricing-deliv-head {
        margin-bottom: 36px;
        padding-bottom: 32px;
        border-bottom: 1px solid var(--line-soft);
      }
      .pricing-deliv-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .pricing-deliv-card {
        padding: 28px;
        transition: transform .25s ease, border-color .25s ease;
      }
      .pricing-deliv-card:hover {
        transform: translateY(-3px);
        border-color: var(--line);
      }
      @media (max-width: 1080px) {
        .pricing-deliv-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 620px) {
        .pricing-deliv-grid { grid-template-columns: 1fr; }
      }

      /* ── Implementation plan ── */
      .pricing-impl {
        position: relative;
        overflow: hidden;
        padding: clamp(40px, 5vw, 64px);
        border-radius: 22px;
        background: linear-gradient(180deg,
          color-mix(in oklab, var(--bg-1) 90%, white 10%) 0%,
          var(--bg-1) 50%,
          color-mix(in oklab, var(--bg-1) 94%, black 6%) 100%);
        border: 1px solid var(--line-soft);
        box-shadow:
          inset 0 1px 0 0 color-mix(in oklab, white 8%, transparent),
          inset 0 -1px 0 0 color-mix(in oklab, black 30%, transparent),
          0 30px 80px -30px color-mix(in oklab, black 50%, transparent);
      }
      .pricing-impl-glow {
        position: absolute; top: -40%; left: -10%;
        width: 600px; height: 600px;
        background: radial-gradient(circle, var(--accent-glow), transparent 60%);
        opacity: 0.5; pointer-events: none;
      }
      .pricing-impl-grid {
        margin-top: 32px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
      }
      .pricing-impl-item {
        display: grid;
        grid-template-columns: 52px 1fr;
        gap: 16px;
        padding: 22px 0;
        border-bottom: 1px solid var(--line-soft);
        align-items: start;
      }
      .pricing-impl-item:nth-last-child(-n+2) {
        border-bottom: 0;
      }
      .pricing-impl-num {
        display: inline-flex;
        padding: 8px 12px;
        font-family: var(--font-mono);
        color: var(--accent);
        font-size: 13px;
        letter-spacing: 0.12em;
        background: var(--bg-2);
        border-radius: 6px;
        text-align: center;
        justify-content: center;
      }
      .pricing-impl-cta {
        margin-top: 36px;
        padding-top: 28px;
        border-top: 1px solid var(--line-soft);
        display: flex;
        align-items: center;
        gap: 18px;
        flex-wrap: wrap;
      }
      @media (max-width: 880px) {
        .pricing-impl-grid { grid-template-columns: 1fr; }
        .pricing-impl-item { border-bottom: 1px solid var(--line-soft); }
        .pricing-impl-item:last-child { border-bottom: 0; }
      }
    `}</style>
  );
}
