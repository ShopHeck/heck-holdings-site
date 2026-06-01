import Icon from './Icon.jsx';

const DELIVERABLES = [
  {
    icon: 'workflow',
    title: 'Complete workflow map',
    desc: "Every process your team touches — diagrammed, timed, and costed. You'll see exactly where the hours go.",
  },
  {
    icon: 'chart',
    title: 'Agent opportunity scorecard',
    desc: 'Each candidate automation ranked by impact, feasibility, and payback period. No guesswork — just math.',
  },
  {
    icon: 'bolt',
    title: 'ROI projections',
    desc: 'Dollar-and-cents estimates for every recommended agent: hours saved, error reduction, and revenue impact.',
  },
  {
    icon: 'doc',
    title: 'Implementation plan',
    desc: 'A prioritized 90-day roadmap with recommended automated workflows tailored to your business and stack.',
  },
  {
    icon: 'shield',
    title: 'Risk register',
    desc: 'What could go wrong, how likely it is, and exactly what we do about it. No surprises after kickoff.',
  },
  {
    icon: 'plug',
    title: 'Integration architecture',
    desc: 'How each agent connects to your existing tools — CRM, email, accounting, scheduling — with zero disruption.',
  },
];

const TIMELINE = [
  {
    days: '01–02',
    title: 'Discovery & observation',
    body: 'We embed with your team. Watch the real workflows. Interview the people doing the work. Map every tool, handoff, and bottleneck.',
  },
  {
    days: '03',
    title: 'Analysis & scoring',
    body: 'We score every workflow against our automation framework — effort, impact, risk, and dependencies. The scorecard takes shape.',
  },
  {
    days: '04',
    title: 'Architecture & planning',
    body: 'We design the agent architecture, map integrations, build the ROI model, and draft your 90-day implementation roadmap.',
  },
  {
    days: '05',
    title: 'Deliverable & walkthrough',
    body: 'You get the full audit package and a live walkthrough. Every question answered. You leave knowing exactly what to build first.',
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
          <h2>One week. One fixed price.<br /><span style={{ color: 'var(--fg-3)' }}>Your complete AI roadmap.</span></h2>
          <p className="lead">
            Before we build anything, we figure out exactly what's worth building. The AI Audit is a five-day deep dive into your operations — you walk away with a ranked list of automations, hard ROI numbers, and a plan to execute.
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
                  AI Audit
                </span>
                <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 11 }}>fixed scope · fixed price</span>
              </div>

              <div className="pricing-price-row">
                <div>
                  <div className="pricing-price">$2,500</div>
                  <div className="mono" style={{ color: 'var(--accent)', fontSize: 12, marginTop: 4 }}>
                    one-time · invoiced after delivery
                  </div>
                </div>
                <div className="pricing-divider" />
                <div>
                  <div className="pricing-days">5</div>
                  <div className="mono" style={{ color: 'var(--fg-2)', fontSize: 12, marginTop: 4 }}>
                    business days
                  </div>
                </div>
              </div>

              <p style={{ marginTop: 28, color: 'var(--fg-2)', fontSize: 16, lineHeight: 1.6 }}>
                We shadow your team for a week, map every workflow that's eating your time, and hand you a plan that tells you <em style={{ color: 'var(--fg)' }}>exactly</em> which AI agents will move the needle — and how much they'll save.
              </p>

              <div className="pricing-cta-row">
                <button className="btn btn-primary" onClick={scrollToContact}>
                  Book your audit
                  <Icon name="arrow-right" size={16} />
                </button>
                <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 11.5 }}>
                  30-min call first · we'll tell you if you're not ready
                </span>
              </div>

              <div className="pricing-trust">
                {[
                  'Fixed fee — no hourly billing',
                  'Invoiced after we deliver',
                  'Full audit or your money back',
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
                Five days, start to finish
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
              Six deliverables. Zero fluff.
            </h3>
            <p style={{ marginTop: 12, color: 'var(--fg-2)', fontSize: 15.5, lineHeight: 1.55, maxWidth: 640 }}>
              Every deliverable is actionable on its own — you don't need us to build anything for the audit to pay for itself.
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
            <span className="eyebrow"><span className="dot"></span>The implementation plan</span>
            <h3 style={{ marginTop: 18, fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
              Not just <em>what</em> to automate — <span style={{ color: 'var(--accent)' }}>how to build it.</span>
            </h3>
            <p style={{ marginTop: 16, color: 'var(--fg-2)', fontSize: 16, lineHeight: 1.6, maxWidth: 720 }}>
              Your audit includes a 90-day implementation plan with specific automated workflow recommendations tailored to your business. Here's what's inside:
            </p>

            <div className="pricing-impl-grid">
              {[
                {
                  n: '01',
                  title: 'Workflow automation specs',
                  body: 'For each recommended agent: what it does, which tools it connects to, what triggers it, and exactly how it saves you time.',
                },
                {
                  n: '02',
                  title: 'Priority & sequencing',
                  body: 'Which automations to build first based on ROI, complexity, and dependencies. A clear order of operations — not a wish list.',
                },
                {
                  n: '03',
                  title: 'Integration map',
                  body: "How each automated workflow plugs into your existing stack — your CRM, email, accounting, whatever you're running today.",
                },
                {
                  n: '04',
                  title: 'Timeline & milestones',
                  body: 'A realistic 90-day build schedule with concrete milestones so you can track progress and know what "done" looks like.',
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
                Book your AI Audit — $2,500
                <Icon name="arrow-right" size={16} />
              </button>
              <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 11.5 }}>
                Most clients recoup the audit fee in the first 30 days of their first agent.
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
