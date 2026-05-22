import { useState, useRef, useEffect, forwardRef } from 'react';
import Icon from './Icon.jsx';
import { Logo } from './Nav.jsx';

const CAL_LINK = 'shop-heck/heck-holdings-consult';

export default function Cta() {
  const onBook = ({ business, workflow, spec }) => openCalWithBrief({ business, workflow, spec });

  return (
    <section id="contact" style={{ padding: 'clamp(80px, 10vw, 140px) 0 0', position: 'relative' }}>
      <div className="wrap">
        <div className="cta-shell">
          <div aria-hidden="true" style={{
            position: 'absolute', top: '-40%', right: '-10%',
            width: 600, height: 600,
            background: 'radial-gradient(circle, var(--accent-glow), transparent 60%)',
            opacity: 0.6, pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative' }}>
            <div style={{ maxWidth: 880 }}>
              <span className="eyebrow"><span className="dot"></span>08 — Start</span>
              <h2 style={{
                fontSize: 'clamp(40px, 5.6vw, 76px)',
                fontWeight: 700, marginTop: 24,
                letterSpacing: '-0.035em', lineHeight: 1.02,
              }}>
                Don't book a meeting.
                <br />
                <span style={{ color: 'var(--accent)' }}>Get an agent designed for you</span> in 60 seconds.
              </h2>
              <p style={{ marginTop: 24, color: 'var(--fg-2)', fontSize: 'clamp(15px, 1.25vw, 18px)', lineHeight: 1.55, maxWidth: 640 }}>
                Two questions. One agent spec. Real numbers. If it sounds wrong, hit refine. If it sounds right, that's your audit brief — book the call with it.
              </p>
            </div>

            <AgentBuilder onBook={onBook} />
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .cta-shell {
          background: linear-gradient(180deg, var(--bg-1), var(--bg));
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: clamp(40px, 6vw, 80px);
          position: relative; overflow: hidden;
          box-shadow:
            inset 0 1px 0 0 color-mix(in oklab, white 8%, transparent),
            inset 0 -1px 0 0 color-mix(in oklab, black 30%, transparent),
            0 30px 80px -30px color-mix(in oklab, black 60%, transparent);
        }
      `}</style>
    </section>
  );
}

// ─── AgentBuilder ────────────────────────────────────────────────────────
function AgentBuilder({ onBook }) {
  const [step, setStep] = useState('business');
  const [business, setBusiness] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [spec, setSpec] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if ((step === 'business' || step === 'workflow') && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const generate = async (biz, wf) => {
    setStep('thinking');
    setErrMsg(null);

    const fallback = {
      agent_name: 'CustomAgent',
      one_line: wf ? `Automates the ${wf.toLowerCase()} workflow end-to-end for your team.` : 'Automates the workflow end-to-end for your team.',
      weekly_hours_saved: 14,
      ship_days: 21,
      monthly_revenue_impact: '+$8,200',
      first_action: 'Indexes the last 90 days of activity and proposes the three best automations.',
    };

    try {
      const res = await fetch('/api/agent-spec', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ business: biz, workflow: wf }),
      });
      if (res.status === 429) {
        const payload = await res.json().catch(() => ({}));
        setSpec(fallback);
        setErrMsg(payload.error || 'Slow down — you\'ve hit the rate limit. Try again in a minute.');
        setStep('ready');
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const parsed = await res.json();
      parsed.weekly_hours_saved = clamp(Number(parsed.weekly_hours_saved) || fallback.weekly_hours_saved, 6, 30);
      parsed.ship_days = clamp(Number(parsed.ship_days) || fallback.ship_days, 12, 35);
      setSpec({ ...fallback, ...parsed });
      setStep('ready');
    } catch (e) {
      console.warn('AgentBuilder: spec generation failed, using fallback', e);
      setSpec(fallback);
      setErrMsg('Live spec generation hit a snag — showing a sample to give you the idea.');
      setStep('ready');
    }
  };

  const submitBusiness = (e) => {
    e.preventDefault();
    if (business.trim().length < 4) return;
    setStep('workflow');
  };
  const submitWorkflow = (e) => {
    e.preventDefault();
    const v = workflow.trim();
    if (v.length < 4) return;
    generate(business.trim(), v);
  };
  const reset = () => {
    setStep('business'); setBusiness(''); setWorkflow(''); setSpec(null); setErrMsg(null);
  };

  return (
    <div className="ab-shell">
      <ProgressDots step={step} />

      <div className="ab-thread">
        <Message side="agent">What does your business do?</Message>
        {business.trim() && <Message side="user">{business.trim()}</Message>}

        {(step === 'workflow' || step === 'thinking' || step === 'ready') && (
          <Message side="agent">Got it. What workflow eats your week?</Message>
        )}
        {workflow.trim() && <Message side="user">{workflow.trim()}</Message>}

        {step === 'thinking' && <Thinking biz={business} wf={workflow} />}
      </div>

      {step === 'business' && (
        <BuilderInput
          ref={inputRef}
          placeholder="e.g. 12-truck roofing company in Sarasota"
          value={business} onChange={setBusiness} onSubmit={submitBusiness} cta="Next"
        />
      )}
      {step === 'workflow' && (
        <BuilderInput
          ref={inputRef}
          placeholder="e.g. writing proposals after every site visit"
          value={workflow} onChange={setWorkflow} onSubmit={submitWorkflow} cta="Generate spec"
        />
      )}

      {step === 'ready' && spec && (
        <SpecCard spec={spec} onBook={onBook} onReset={reset} errMsg={errMsg} business={business} workflow={workflow} />
      )}

      <style>{`
        .ab-shell {
          margin-top: 48px;
          padding: clamp(24px, 3vw, 36px);
          background: oklch(0.10 0.006 250);
          border: 1px solid var(--line-soft);
          border-radius: 16px;
          position: relative;
          box-shadow: inset 0 1px 0 0 color-mix(in oklab, white 5%, transparent);
        }
        .ab-thread {
          display: flex; flex-direction: column; gap: 10px;
          margin-bottom: 28px; min-height: 120px;
        }
        .ab-msg {
          max-width: 78%;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14.5px; line-height: 1.45;
          animation: ab-pop .35s cubic-bezier(.2,.7,.2,1) both;
        }
        .ab-msg.agent {
          align-self: flex-start;
          background: var(--bg-1);
          border: 1px solid var(--line-soft);
          color: var(--fg);
          border-bottom-left-radius: 4px;
        }
        .ab-msg.user {
          align-self: flex-end;
          background: color-mix(in oklab, var(--accent) 16%, transparent);
          border: 1px solid color-mix(in oklab, var(--accent) 50%, transparent);
          color: var(--fg);
          border-bottom-right-radius: 4px;
        }
        .ab-msg .lbl {
          display: block;
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--fg-3);
          margin-bottom: 5px;
        }
        .ab-msg.user .lbl { color: var(--accent); }

        @keyframes ab-pop {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: none; }
        }

        .ab-input-row {
          display: flex; gap: 10px; flex-wrap: wrap;
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 8px 8px 8px 18px;
          transition: border-color .2s, box-shadow .2s;
        }
        .ab-input-row:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--accent) 18%, transparent);
        }
        .ab-input-row input {
          flex: 1 1 240px; min-width: 0;
          background: transparent; border: 0; outline: 0;
          color: var(--fg); font-family: var(--font-body);
          font-size: 15.5px; padding: 10px 0;
        }
        .ab-input-row input::placeholder { color: var(--fg-3); }
        .ab-input-row button {
          padding: 12px 20px;
          border-radius: 999px;
          background: var(--accent); color: var(--accent-ink);
          font-weight: 500; font-size: 14px;
          display: inline-flex; align-items: center; gap: 8px;
          transition: transform .15s;
        }
        .ab-input-row button:disabled { opacity: 0.4; cursor: not-allowed; }
        .ab-input-row button:not(:disabled):hover { transform: translateY(-1px); }

        .ab-thinking {
          align-self: flex-start;
          font-family: var(--font-mono);
          font-size: 12px; color: var(--fg-3);
          letter-spacing: 0.04em;
          padding: 10px 14px;
          background: var(--bg-1);
          border: 1px solid var(--line-soft);
          border-radius: 10px;
          display: flex; align-items: center; gap: 10px;
          margin-top: 2px;
        }
        .ab-thinking .dots { display: inline-flex; gap: 4px; }
        .ab-thinking .dots span {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent);
          animation: ab-blink 1.2s infinite ease-in-out;
        }
        .ab-thinking .dots span:nth-child(2) { animation-delay: 0.15s; }
        .ab-thinking .dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes ab-blink {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.4; }
          40% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

function ProgressDots({ step }) {
  const order = ['business', 'workflow', 'ready'];
  const idx = step === 'thinking' ? 2 : order.indexOf(step);
  return (
    <div style={{
      display: 'flex', gap: 14, alignItems: 'center', marginBottom: 22,
      paddingBottom: 18, borderBottom: '1px solid var(--line-soft)',
    }}>
      {[{ lbl: 'Business' }, { lbl: 'Workflow' }, { lbl: 'Spec' }].map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={i} className="flex gap-2" style={{ alignItems: 'center' }}>
            <span style={{
              width: 22, height: 22, borderRadius: '50%',
              display: 'grid', placeItems: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
              background: done || active ? 'var(--accent)' : 'transparent',
              color: done || active ? 'var(--accent-ink)' : 'var(--fg-3)',
              border: `1.5px solid ${done || active ? 'var(--accent)' : 'var(--line)'}`,
              transition: 'all .25s',
            }}>
              {done ? '✓' : i + 1}
            </span>
            <span className="mono" style={{
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: active ? 'var(--fg)' : 'var(--fg-3)',
            }}>{s.lbl}</span>
            {i < 2 && (
              <span style={{
                width: 28, height: 1,
                background: done ? 'var(--accent)' : 'var(--line)',
                marginLeft: 4, marginRight: -4,
                transition: 'background .25s',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Message({ side, children }) {
  return (
    <div className={`ab-msg ${side}`}>
      <span className="lbl">{side === 'agent' ? 'Heck' : 'You'}</span>
      {children}
    </div>
  );
}

const BuilderInput = forwardRef(function BuilderInput({ placeholder, value, onChange, onSubmit, cta }, ref) {
  const disabled = value.trim().length < 4;
  return (
    <form className="ab-input-row" onSubmit={onSubmit}>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={140}
      />
      <button type="submit" disabled={disabled}>
        {cta}
        <Icon name="arrow-right" size={14} />
      </button>
    </form>
  );
});

function Thinking({ biz, wf }) {
  const lines = [
    'reading inputs',
    `scoring agent shapes for ${biz.split(' ').slice(0, 3).join(' ').toLowerCase() || 'your business'}`,
    `pricing ${wf.split(' ').slice(0, 4).join(' ').toLowerCase() || 'the workflow'}`,
    'drafting spec',
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => Math.min(x + 1, lines.length - 1)), 450);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="ab-thinking">
      <span className="dots"><span></span><span></span><span></span></span>
      <span>{lines[i]}…</span>
    </div>
  );
}

function SpecCard({ spec, onBook, onReset, errMsg, business, workflow }) {
  return (
    <div className="spec-card">
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 16, flexWrap: 'wrap', marginBottom: 18,
      }}>
        <div>
          <div className="eyebrow"><span className="dot"></span>Proposed agent · drafted for you</div>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(36px, 4.4vw, 56px)',
            letterSpacing: '-0.035em', marginTop: 14,
            color: 'var(--accent)',
            textShadow: '0 0 36px var(--accent-glow)',
          }}>
            {spec.agent_name}
          </div>
        </div>
        <button
          onClick={onReset}
          className="mono"
          style={{
            padding: '8px 14px',
            border: '1px solid var(--line)',
            borderRadius: 999,
            fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--fg-2)', background: 'transparent', cursor: 'pointer',
          }}
        >
          ⟲ Refine
        </button>
      </div>

      <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--fg-2)', maxWidth: 680 }}>
        {spec.one_line}
      </p>

      <div className="spec-metrics">
        <SpecMetric label="Hours saved" value={`${spec.weekly_hours_saved} / wk`} accent />
        <SpecMetric label="Ships in" value={`${spec.ship_days} days`} />
        <SpecMetric label="Revenue impact" value={spec.monthly_revenue_impact} accent />
        <SpecMetric label="First action" value={spec.first_action} mono />
      </div>

      {errMsg && (
        <div className="mono" style={{
          marginTop: 18, padding: '10px 14px',
          background: 'color-mix(in oklab, var(--warn) 8%, transparent)',
          border: '1px solid color-mix(in oklab, var(--warn) 40%, transparent)',
          borderRadius: 8, fontSize: 11.5, color: 'var(--fg-2)', letterSpacing: '0.04em',
        }}>{errMsg}</div>
      )}

      <div className="spec-cta">
        <button className="btn btn-primary" onClick={() => onBook && onBook({ business, workflow, spec })}>
          Book the audit with this brief
          <Icon name="arrow-right" size={16} />
        </button>
        <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 11.5, letterSpacing: '0.04em' }}>
          30-min call · no decks · we tell you if you're not ready
        </div>
      </div>

      <style>{`
        .spec-card {
          position: relative;
          padding: clamp(24px, 3vw, 36px);
          background: linear-gradient(180deg,
            color-mix(in oklab, var(--bg-1) 92%, white 8%) 0%,
            var(--bg-1) 100%);
          border: 1px solid var(--line);
          border-radius: 14px;
          box-shadow:
            inset 0 1px 0 0 color-mix(in oklab, white 7%, transparent),
            0 28px 60px -28px color-mix(in oklab, black 55%, transparent);
          animation: ab-pop .45s cubic-bezier(.2,.7,.2,1) both;
        }
        .spec-card::before {
          content: "";
          position: absolute; inset: 0 0 auto 0; height: 1px;
          background: linear-gradient(90deg, transparent, color-mix(in oklab, white 14%, transparent) 50%, transparent);
          opacity: 0.6;
        }

        .spec-metrics {
          margin-top: 26px;
          padding-top: 22px;
          border-top: 1px solid var(--line-soft);
          display: grid;
          grid-template-columns: repeat(2, 1fr) 1.4fr;
          gap: 28px;
        }
        @media (max-width: 880px) { .spec-metrics { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .spec-metrics { grid-template-columns: 1fr; } }

        .spec-cta { margin-top: 28px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
      `}</style>
    </div>
  );
}

function SpecMetric({ label, value, accent, mono }) {
  return (
    <div>
      <div className="mono" style={{
        color: 'var(--fg-3)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
      }}>{label}</div>
      <div style={{
        marginTop: 6,
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-display)',
        fontSize: mono ? 12.5 : 22,
        fontWeight: mono ? 400 : 600,
        letterSpacing: mono ? '0.02em' : '-0.02em',
        lineHeight: mono ? 1.4 : 1.1,
        color: accent ? 'var(--accent)' : 'var(--fg)',
      }}>{value}</div>
    </div>
  );
}

// Opens Cal.com with the AgentBuilder spec prefilled into the booking notes
// so the call starts with the brief already in hand.
function openCalWithBrief({ business, workflow, spec }) {
  const lines = [
    `Agent proposed: ${spec.agent_name}`,
    `What it does: ${spec.one_line}`,
    '',
    `Business: ${business}`,
    `Workflow: ${workflow}`,
    '',
    `Hours saved: ${spec.weekly_hours_saved}/wk`,
    `Ships in: ${spec.ship_days} days`,
    `Revenue impact: ${spec.monthly_revenue_impact}`,
    `First action: ${spec.first_action}`,
  ];
  const notes = encodeURIComponent(lines.join('\n'));
  const url = `https://cal.com/${CAL_LINK}?notes=${notes}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function Footer() {
  return (
    <footer style={{ marginTop: 80, padding: '32px 0', borderTop: '1px solid var(--line-soft)' }}>
      <div className="wrap flex between" style={{ alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <Logo />
        <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 11.5 }}>
          © 2026 Heck Holdings, LLC · St. Pete, FL · <a href="mailto:hello@heckholdings.com">hello@heckholdings.com</a>
        </div>
        <div className="flex gap-4 mono" style={{ color: 'var(--fg-3)', fontSize: 11.5 }}>
          <a href="#" style={{ color: 'inherit' }}>Privacy</a>
          <a href="#" style={{ color: 'inherit' }}>Terms</a>
          <a href="https://linkedin.com/company/heck-holdings" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
