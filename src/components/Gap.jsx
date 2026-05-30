import { useState, useEffect, useRef } from 'react';
import Icon from './Icon.jsx';

export default function Gap({ animations = true }) {
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0);
  const rafRef = useRef();
  const lastRef = useRef(performance.now());
  const DURATION = 12000;

  useEffect(() => {
    if (!playing || !animations) return;
    const tick = (now) => {
      const dt = now - lastRef.current;
      lastRef.current = now;
      setT(prev => (prev + dt / DURATION) % 1);
      rafRef.current = requestAnimationFrame(tick);
    };
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, animations]);

  const reset = () => { setT(0); lastRef.current = performance.now(); };

  const manualSteps = [
    { l: 'Customer email arrives', dur: 0.04 },
    { l: 'Sarah notices in inbox', dur: 0.12 },
    { l: 'Reads & checks Shopify', dur: 0.18 },
    { l: 'Drafts reply, asks manager', dur: 0.25 },
    { l: 'Processes refund in Stripe', dur: 0.22 },
    { l: 'Replies + closes ticket', dur: 0.19 },
  ];
  const agentSteps = [
    { l: 'Email ingested', dur: 0.005 },
    { l: 'Intent classified', dur: 0.008 },
    { l: 'Order looked up', dur: 0.012 },
    { l: 'Refund issued', dur: 0.020 },
    { l: 'Reply sent', dur: 0.010 },
    { l: 'Logged & briefed', dur: 0.035 },
  ];

  const accumulate = (steps) => {
    let acc = 0;
    return steps.map(s => {
      const start = acc; acc += s.dur; return { ...s, start, end: acc };
    });
  };
  const manual = accumulate(manualSteps);
  const agent = accumulate(agentSteps);

  const manualMinutes = (t * 240).toFixed(0);
  const agentSeconds = Math.min(t * 600, 11.3).toFixed(1);
  const agentDone = t > 0.094;
  const manualDone = t > 0.99;

  return (
    <section id="gap" className="section">
      <div className="wrap">
        <div className="section-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span className="eyebrow"><span className="dot"></span>02 — The Gap</span>
            <span className="gap-illustrative-pill">illustrative example</span>
          </div>
          <h2>One task. Two timelines.<br/><span style={{ color: 'var(--fg-3)' }}>The same refund request, handled two different ways.</span></h2>
          <p className="lead">
            An illustrative side-by-side — not a measured client result. We press start at the same instant. Watch the human bar inch along. Watch the agent bar finish before you finish reading this sentence.
          </p>
        </div>

        <div className="gap-controls">
          <button className="btn btn-ghost" onClick={() => setPlaying(p => !p)} style={{ padding: '10px 16px' }}>
            <Icon name={playing ? 'pause' : 'play'} size={14} />
            {playing ? 'Pause' : 'Play'}
          </button>
          <button className="btn btn-ghost" onClick={reset} style={{ padding: '10px 16px' }}>Restart</button>
          <div className="flex gap-3" style={{ alignItems: 'center', marginLeft: 'auto' }}>
            <span className="mono" style={{ color: 'var(--fg-3)' }}>t =</span>
            <span className="mono" style={{
              color: 'var(--accent)', fontSize: 13,
              fontVariantNumeric: 'tabular-nums',
              display: 'inline-block', minWidth: '4.5em', textAlign: 'right',
            }}>{(t * 100).toFixed(1)}%</span>
          </div>
        </div>

        <div className="gap-grid">
          <Track
            label="Human workflow"
            sublabel="Sarah, ops manager"
            steps={manual}
            t={t}
            color="oklch(0.70 0.18 25)"
            stat={{ v: `${manualMinutes} min`, l: 'elapsed real-time' }}
            done={manualDone}
            verdict={manualDone ? 'Ticket closed · cost ~$94 in labor' : 'Working…'}
            tone="warn"
          />
          <Track
            label="Heck agent workflow"
            sublabel="mailroom → billing → orchestrator"
            steps={agent}
            t={t}
            color="var(--accent)"
            stat={{ v: agentDone ? '11.3 s' : `${agentSeconds} s`, l: 'elapsed real-time' }}
            done={agentDone}
            verdict={agentDone ? 'Resolved · cost $0.04' : 'Working…'}
            tone="good"
          />
        </div>

        <div className="gap-summary">
          <div>
            <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Time delta</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--accent)' }}>1,275×</div>
            <div style={{ color: 'var(--fg-2)' }}>faster, per ticket</div>
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Cost delta</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.03em' }}>99.95<span style={{ color: 'var(--accent)' }}>%</span></div>
            <div style={{ color: 'var(--fg-2)' }}>cheaper, per ticket</div>
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Consistency</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.03em' }}>100<span style={{ color: 'var(--accent)' }}>%</span></div>
            <div style={{ color: 'var(--fg-2)' }}>logged & auditable, every ticket</div>
          </div>
        </div>
      </div>

      <style>{`
        .gap-illustrative-pill {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--warn); padding: 4px 9px; border-radius: 999px;
          border: 1px dashed color-mix(in oklab, var(--warn) 60%, transparent);
          background: color-mix(in oklab, var(--warn) 5%, transparent);
        }
        .gap-controls { display: flex; gap: 12px; align-items: center; margin-bottom: 32px; }
        .gap-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .gap-summary {
          margin-top: 64px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          padding-top: 48px;
          border-top: 1px solid var(--line-soft);
        }
        @media (max-width: 720px) { .gap-summary { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function Track({ label, sublabel, steps, t, color, stat, done, verdict, tone }) {
  const activeIdx = steps.findIndex(s => t < s.end);
  const safeActive = activeIdx === -1 ? steps.length - 1 : activeIdx;
  const progress = Math.min(t, 1);

  return (
    <div className="card" style={{ padding: 28, position: 'relative' }}>
      <div className="flex between" style={{ alignItems: 'flex-start', marginBottom: 22, gap: 16 }}>
        <div style={{ minWidth: 0 }}>
          <div className="flex gap-3" style={{ alignItems: 'center' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, boxShadow: `0 0 16px ${color}`, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600 }}>{label}</span>
          </div>
          <div className="mono" style={{ color: 'var(--fg-3)', marginTop: 6 }}>{sublabel}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600,
            letterSpacing: '-0.03em', lineHeight: 1,
            color: tone === 'good' ? 'var(--accent)' : 'var(--fg)',
            fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
          }}>{stat.v}</div>
          <div className="mono" style={{ color: 'var(--fg-3)', marginTop: 6 }}>{stat.l}</div>
        </div>
      </div>

      <div style={{
        position: 'relative', height: 44,
        background: 'oklch(0.13 0.006 250)',
        border: '1px solid var(--line-soft)',
        borderRadius: 8, overflow: 'hidden',
      }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${s.end * 100}%`, top: 0, bottom: 0,
            width: 1, background: 'var(--line-soft)',
          }} />
        ))}

        <div style={{
          position: 'absolute', inset: 0, width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${color}33, ${color})`,
        }} />

        {!done && progress > 0.001 && (
          <div style={{
            position: 'absolute', top: -3, bottom: -3,
            left: `${progress * 100}%`, width: 2,
            background: color, boxShadow: `0 0 12px ${color}`,
            transform: 'translateX(-1px)',
          }} />
        )}

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', padding: '0 14px',
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'var(--fg)', mixBlendMode: 'difference',
        }}>
          <span style={{ opacity: 0.9 }}>{steps[safeActive]?.l || verdict}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 14, justifyContent: 'space-between' }}>
        {steps.map((s, i) => {
          const isPast = t >= s.end;
          const isActive = i === safeActive && !done;
          return (
            <div key={i} className="flex gap-2" style={{ alignItems: 'center', flex: 1 }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: isPast ? color : 'transparent',
                border: `1.5px solid ${isPast || isActive ? color : 'var(--line)'}`,
                flexShrink: 0,
                transition: 'background .2s, border-color .2s',
              }} />
              <span className="mono" style={{
                fontSize: 10.5,
                color: isPast || isActive ? 'var(--fg-2)' : 'var(--fg-3)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{s.l}</span>
            </div>
          );
        })}
      </div>

      <div className="mono" style={{
        marginTop: 18, padding: '10px 14px',
        background: tone === 'good' ? 'oklch(0.85 0.17 145 / 0.08)' : 'oklch(0.70 0.18 25 / 0.08)',
        border: `1px solid ${tone === 'good' ? 'oklch(0.85 0.17 145 / 0.3)' : 'oklch(0.70 0.18 25 / 0.3)'}`,
        borderRadius: 6, fontSize: 12,
        color: tone === 'good' ? 'var(--accent)' : 'var(--danger)',
        opacity: done ? 1 : 0,
        transition: 'opacity .3s ease',
      }}>
        <Icon name="check" size={12} style={{ marginRight: 6, verticalAlign: -1 }} />
        {done ? verdict : ' '}
      </div>
    </div>
  );
}
