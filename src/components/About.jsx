import { useState } from 'react';
import Icon from './Icon.jsx';
import { SERVICES, FAQS } from '../data.js';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>07 — Heck Holdings</span>
          <h2>An AI consulting firm<br/><span style={{ color: 'var(--fg-3)' }}>that ships agents, not slide decks.</span></h2>
        </div>

        <div className="about-grid">
          <div className="about-intro">
            <p className="about-lead">
              <span className="drop-cap">H</span>eck Holdings is a small, senior team with one focus: autonomous AI agents for small and mid-sized businesses. We design them, build them, and operate them — under one roof, by the same people.
            </p>
            <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.65, color: 'var(--fg-2)' }}>
              We don't sell software. We don't sell hours. We sell <em>agents that own a specific outcome</em>, then we stay on to make sure they keep owning it. We measure our work the way you measure yours — in hours reclaimed, dollars saved, and revenue moved.
            </p>
            <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.65, color: 'var(--fg-2)' }}>
              We start every engagement with a one-week audit so you know exactly what you're buying. And we invoice <em>after</em> the agent works — never before.
            </p>

            <div className="about-facts">
              <Fact label="Based" value="St. Pete, FL" />
              <Fact label="Founded" value="2023" />
              <Fact label="Team" value="2 engineers + ops" />
              <Fact label="Availability" value="3 new clients" />
            </div>
          </div>

          <div>
            <div className="card beliefs-card">
              <div className="beliefs-head">
                <span className="eyebrow" style={{ color: 'var(--fg-3)' }}><span className="dot"></span>What we believe</span>
              </div>
              <ol className="beliefs-list">
                {[
                  'Most "AI projects" fail because they shipped a chatbot instead of solving a workflow.',
                  'A good agent owns an outcome end-to-end. A bad one needs you to babysit it.',
                  'Evals before deploys. Observability before scale. Always.',
                  'You should never pay for an agent that hasn’t paid for itself.',
                ].map((b, i) => (
                  <li key={i}>
                    <span className="belief-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="belief-text">{b}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <PullQuote />

        <Services />
        <Process />
        <FAQ />
      </div>

      <style>{`
        .about-grid {
          display: grid; grid-template-columns: 1.1fr 0.95fr;
          gap: 72px; margin-bottom: 96px; align-items: start;
        }
        @media (max-width: 980px) { .about-grid { grid-template-columns: 1fr; gap: 40px; } }
        .about-lead {
          font-family: var(--font-display); font-size: clamp(22px, 2.2vw, 30px);
          line-height: 1.35; letter-spacing: -0.01em; color: var(--fg); text-wrap: pretty;
        }
        .drop-cap {
          float: left; font-family: var(--font-display); font-size: 5.2em;
          line-height: 0.85; font-weight: 700;
          padding: 0.05em 0.12em 0 0; margin-right: 4px; color: var(--accent);
          background: linear-gradient(180deg, var(--accent), color-mix(in oklab, var(--accent) 70%, var(--fg) 30%));
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .about-facts {
          margin-top: 48px; padding: 24px 28px;
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px 32px;
          border-radius: var(--r-lg); border: 1px solid var(--line-soft);
          background: color-mix(in oklab, var(--bg-1) 80%, transparent);
          box-shadow:
            inset 0 1px 0 0 color-mix(in oklab, white 5%, transparent),
            inset 0 -1px 0 0 color-mix(in oklab, black 22%, transparent),
            0 12px 30px -16px color-mix(in oklab, black 40%, transparent);
        }
        .beliefs-card { padding: 36px; }
        .beliefs-head { margin-bottom: 26px; }
        .beliefs-list {
          list-style: none; padding: 0; margin: 0;
          display: grid; gap: 4px;
        }
        .beliefs-list li {
          display: grid; grid-template-columns: 56px 1fr;
          gap: 18px; padding: 18px 0;
          border-bottom: 1px solid var(--line-soft);
          align-items: start;
        }
        .beliefs-list li:last-child { border-bottom: 0; padding-bottom: 0; }
        .belief-num {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.18em; padding: 8px 10px;
          background: var(--bg-2); color: var(--accent);
          border-radius: 6px; align-self: start; text-align: center;
        }
        .belief-text { font-size: 15.5px; line-height: 1.5; color: var(--fg); }
      `}</style>
    </section>
  );
}

function PullQuote() {
  return (
    <figure className="pull-quote">
      <div className="quote-mark" aria-hidden="true">“</div>
      <blockquote>
        Every business in America will run agents within five years.
        The ones who start now will own the next decade. The ones who wait
        will spend it <span style={{ color: 'var(--accent)' }}>catching up</span>.
      </blockquote>
      <figcaption>
        <span className="qc-avatar" aria-hidden="true">MH</span>
        <span className="qc-meta">
          <span className="qc-name">Michael Heckert</span>
          <span className="qc-role">Founder, Heck Holdings</span>
        </span>
      </figcaption>
      <style>{`
        .pull-quote {
          margin: 0 0 96px 0;
          padding: 72px clamp(32px, 5vw, 80px);
          border-radius: 22px; position: relative;
          background:
            radial-gradient(circle at 85% 0%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 50%),
            linear-gradient(180deg,
              color-mix(in oklab, var(--bg-1) 90%, white 10%) 0%,
              var(--bg-1) 50%,
              color-mix(in oklab, var(--bg-1) 94%, black 6%) 100%);
          border: 1px solid var(--line-soft);
          box-shadow:
            inset 0 1px 0 0 color-mix(in oklab, white 8%, transparent),
            inset 0 -1px 0 0 color-mix(in oklab, black 30%, transparent),
            0 30px 80px -30px color-mix(in oklab, black 50%, transparent);
          overflow: hidden;
        }
        .quote-mark {
          position: absolute; top: 8px; left: 24px;
          font-family: var(--font-display); font-size: 220px; line-height: 1;
          color: var(--accent); opacity: 0.18; pointer-events: none; user-select: none;
        }
        .pull-quote blockquote {
          margin: 0; font-family: var(--font-display); font-weight: 500;
          font-size: clamp(28px, 4vw, 56px); line-height: 1.12;
          letter-spacing: -0.025em; color: var(--fg); max-width: 980px;
          position: relative; text-wrap: balance;
        }
        .pull-quote figcaption {
          margin-top: 40px; display: flex; align-items: center; gap: 16px; position: relative;
        }
        .qc-avatar {
          width: 48px; height: 48px; border-radius: 50%;
          display: grid; place-items: center;
          background: linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 50%, black 50%));
          color: var(--accent-ink); font-family: var(--font-display);
          font-weight: 700; font-size: 15px; letter-spacing: 0.05em;
        }
        .qc-meta { display: flex; flex-direction: column; }
        .qc-name { font-weight: 500; font-size: 15px; color: var(--fg); }
        .qc-role { font-family: var(--font-mono); font-size: 11.5px; color: var(--fg-3); letter-spacing: 0.04em; margin-top: 2px; }
      `}</style>
    </figure>
  );
}

function Fact({ label, value }) {
  return (
    <div>
      <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, marginTop: 6, letterSpacing: '-0.02em' }}>{value}</div>
    </div>
  );
}

function Services() {
  return (
    <div className="services-block">
      <div className="services-head">
        <span className="eyebrow"><span className="dot"></span>How we engage</span>
        <h3>Three ways in — all priced before the work starts.</h3>
      </div>
      <div className="svc-grid">
        {SERVICES.map((s) => (
          <div key={s.n} className="svc-row card">
            <div className="svc-n">
              <span className="svc-n-pill">{s.n}</span>
            </div>
            <div className="svc-name">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 600, letterSpacing: '-0.025em' }}>{s.name}</div>
              <div className="mono" style={{ color: 'var(--accent)', marginTop: 8, fontSize: 12 }}>{s.price}</div>
            </div>
            <div className="svc-desc" style={{ color: 'var(--fg-2)', fontSize: 15.5, lineHeight: 1.55 }}>{s.desc}</div>
            <div className="svc-deliv">
              {s.deliverables.map((d, i) => (
                <div key={i} className="flex gap-2" style={{ alignItems: 'center', fontSize: 13.5, color: 'var(--fg-2)', padding: '5px 0' }}>
                  <Icon name="check" size={12} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  {d}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .services-block { margin-top: 32px; }
        .services-head {
          padding-bottom: 32px; margin-bottom: 24px;
          border-bottom: 1px solid var(--line-soft);
        }
        .services-head h3 {
          margin-top: 18px; font-size: clamp(32px, 4vw, 48px);
          font-weight: 600; letter-spacing: -0.025em; max-width: 720px;
        }
        .svc-grid { display: flex; flex-direction: column; gap: 18px; }
        .svc-row {
          display: grid; grid-template-columns: 90px 1.1fr 1.4fr 1fr;
          gap: 36px; padding: 36px 40px;
          align-items: start; transition: transform .25s ease, border-color .25s ease;
        }
        .svc-row:hover { transform: translateY(-2px); }
        .svc-n-pill {
          display: inline-flex; padding: 8px 12px;
          font-family: var(--font-mono); color: var(--accent);
          font-size: 13px; letter-spacing: 0.12em;
          background: var(--bg-2); border-radius: 6px;
        }
        @media (max-width: 980px) {
          .svc-row { grid-template-columns: 60px 1fr; gap: 16px 20px; padding: 28px; }
          .svc-desc, .svc-deliv { grid-column: 1 / -1; }
        }
      `}</style>
    </div>
  );
}

function Process() {
  const steps = [
    { d: '01', t: 'Discovery call', sub: '30 min · free', body: 'We learn your stack, your bottlenecks, and what your team complains about every Monday.', icon: 'phone' },
    { d: '02', t: 'One-week audit', sub: '5 days · fixed fee', body: 'We embed, map workflows, and deliver a ranked list of automations with ROI math you can take to your board.', icon: 'eye' },
    { d: '03', t: 'Build sprint', sub: '2–6 weeks per agent', body: 'We ship one production agent at a time on your stack. You watch us work live in Linear and Slack.', icon: 'workflow' },
    { d: '04', t: 'Operate', sub: 'monthly', body: 'We monitor, evaluate, and improve. Monthly briefs. On-call Slack. New agents added as you grow.', icon: 'shield' },
  ];
  return (
    <div style={{ marginTop: 112 }}>
      <div className="services-head" style={{ paddingBottom: 32, marginBottom: 32, borderBottom: '1px solid var(--line-soft)' }}>
        <span className="eyebrow"><span className="dot"></span>Process</span>
        <h3 style={{ marginTop: 18, fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 600, letterSpacing: '-0.025em', maxWidth: 720 }}>From "what could this look like" to "running by itself."</h3>
      </div>
      <div className="process-grid">
        {steps.map((s, i) => (
          <div key={i} className="card process-card">
            <div className="flex between" style={{ alignItems: 'flex-start', marginBottom: 28 }}>
              <span style={{
                width: 44, height: 44, borderRadius: 10,
                background: 'var(--bg-2)',
                display: 'grid', placeItems: 'center', color: 'var(--accent)',
              }}>
                <Icon name={s.icon} size={20} />
              </span>
              <span className="mono" style={{ color: 'var(--accent)', fontSize: 12, letterSpacing: '0.12em' }}>{s.d}</span>
            </div>
            <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>{s.sub}</div>
            <h4 style={{ fontSize: 24, fontWeight: 600 }}>{s.t}</h4>
            <p style={{ color: 'var(--fg-2)', marginTop: 12, fontSize: 14, lineHeight: 1.55 }}>{s.body}</p>
          </div>
        ))}
      </div>
      <style>{`
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .process-card { padding: 32px; transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
        .process-card:hover { transform: translateY(-3px); }
        @media (max-width: 980px) { .process-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px) { .process-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ marginTop: 112 }}>
      <div className="services-head" style={{ paddingBottom: 32, marginBottom: 8, borderBottom: '1px solid var(--line-soft)' }}>
        <span className="eyebrow"><span className="dot"></span>Common questions</span>
      </div>
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: '1px solid var(--line-soft)' }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: '100%', textAlign: 'left',
                padding: '32px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 24,
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em' }}>
                {f.q}
              </span>
              <span style={{
                width: 40, height: 40, borderRadius: '50%',
                border: '1px solid var(--line)', background: 'var(--bg-1)',
                display: 'grid', placeItems: 'center',
                color: isOpen ? 'var(--accent)' : 'var(--fg-2)',
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                transition: 'transform .25s, color .25s, border-color .25s',
                flexShrink: 0,
              }}>
                <Icon name="plus" size={14} />
              </span>
            </button>
            <div style={{ maxHeight: isOpen ? 240 : 0, overflow: 'hidden', transition: 'max-height .35s ease' }}>
              <p style={{
                paddingBottom: 32, paddingRight: 60,
                color: 'var(--fg-2)', fontSize: 16.5, lineHeight: 1.65, maxWidth: 760,
              }}>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
