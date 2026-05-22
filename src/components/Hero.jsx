import { useState, useEffect, useRef } from 'react';
import Icon from './Icon.jsx';
import { AGENT_LOG } from '../data.js';

export default function Hero({ headline, onCta }) {
  return (
    <section id="top" style={{ paddingTop: 'clamp(96px, 11vh, 140px)', position: 'relative' }}>
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-left">
            <HeroBadge />
            <h1 className="hero-title" style={{
              fontSize: 'clamp(40px, 5.6vw, 76px)',
              fontWeight: 700,
              marginTop: 28,
              letterSpacing: '-0.035em',
              lineHeight: 1.04,
            }}>
              {headline.split('\n').map((line, i, arr) => {
                const isLast = i === arr.length - 1;
                return (
                  <span key={i} className="hero-line" style={{ display: 'block', color: isLast ? 'var(--fg)' : 'var(--fg-2)' }}>
                    {line}
                    {isLast && <span style={{ color: 'var(--accent)' }}>.</span>}
                  </span>
                );
              })}
            </h1>

            <p style={{
              marginTop: 28, maxWidth: 540,
              fontSize: 'clamp(15px, 1.25vw, 18px)',
              lineHeight: 1.55, color: 'var(--fg-2)',
            }}>
              We design, ship, and operate autonomous AI agents for small and mid-sized businesses.
              Audits in a week. Production agents in a month. Most clients break even before their first invoice.
            </p>

            <div className="flex gap-3" style={{ marginTop: 32, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={onCta}>
                Book a 1-week audit
                <Icon name="arrow-right" size={16} />
              </button>
              <a href="#work" className="btn btn-ghost">
                See live work
                <Icon name="arrow-up-right" size={14} />
              </a>
            </div>
          </div>

          <div className="hero-right">
            <RevenueClock />
            <LiveTerminal />
          </div>
        </div>
      </div>

      <Ticker />

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: start;
        }
        .hero-right { display: flex; flex-direction: column; gap: 18px; }
        @media (max-width: 1080px) {
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </section>
  );
}

function HeroBadge() {
  return (
    <div className="flex gap-3" style={{ alignItems: 'center' }}>
      <span className="chip" style={{ animation: 'pulse-dot 2s infinite' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
        12 agents in production
      </span>
      <span className="mono" style={{ color: 'var(--fg-3)' }}>est. 2023 · St. Pete, FL</span>
    </div>
  );
}

function RevenueClock() {
  const BASE = 1432847.00;
  const RATE = 0.42;
  const ANCHOR = useRef(Date.now());
  const [n, setN] = useState(BASE);

  useEffect(() => {
    let raf;
    const tick = () => {
      const elapsed = (Date.now() - ANCHOR.current) / 1000;
      setN(BASE + elapsed * RATE);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const whole = Math.floor(n);
  const cents = Math.floor((n - whole) * 100);

  return (
    <div className="card" style={{ padding: '22px 26px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(420px 220px at 90% 0%, var(--accent-glow), transparent 65%)',
        opacity: 0.65,
      }} />

      <div style={{ position: 'relative' }}>
        <div className="flex between" style={{ alignItems: 'center', gap: 12 }}>
          <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Client savings · YTD</span>
          <span className="flex gap-2 mono" style={{ alignItems: 'center', color: 'var(--accent)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'blink 1.4s infinite' }} />
            live
          </span>
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(36px, 3.6vw, 52px)',
          letterSpacing: '-0.04em', lineHeight: 0.95, marginTop: 12,
          color: 'var(--accent)', textShadow: '0 0 48px var(--accent-glow)',
          fontVariantNumeric: 'tabular-nums',
          display: 'flex', alignItems: 'baseline', gap: 2,
        }}>
          <span>${whole.toLocaleString()}</span>
          <span style={{ fontSize: '0.48em', opacity: 0.7, marginLeft: 4 }}>
            .{String(cents).padStart(2, '0')}
          </span>
        </div>

        <div style={{
          marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18,
          paddingTop: 14, borderTop: '1px solid var(--line-soft)',
        }}>
          {[
            { v: '38k+', l: 'agent-hours / mo' },
            { v: '4.2 wk', l: 'avg time to ship' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.025em' }}>{s.v}</div>
              <div className="mono" style={{ color: 'var(--fg-3)', marginTop: 4, fontSize: 11 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LiveTerminal() {
  const [visible, setVisible] = useState(() => AGENT_LOG.slice(0, 4));
  const [tick, setTick] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const idxRef = useRef(4);

  useEffect(() => {
    const t = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % AGENT_LOG.length;
      setVisible((v) => {
        const next = AGENT_LOG[idxRef.current];
        return [...v.slice(-8), next];
      });
      setTick((t) => t + 1);
    }, 1600);
    const c = setInterval(() => setNow(new Date()), 1000);
    return () => { clearInterval(t); clearInterval(c); };
  }, []);

  const agentColor = (a) => ({
    mailroom: 'oklch(0.85 0.15 145)',
    orchestrator: 'oklch(0.85 0.15 60)',
    billing: 'oklch(0.85 0.15 250)',
    scout: 'oklch(0.85 0.15 320)',
    scheduler: 'oklch(0.85 0.15 30)',
  })[a] || 'var(--fg-2)';

  const time = now.toTimeString().slice(0, 8);

  return (
    <div style={{
      background: 'oklch(0.11 0.006 250)',
      border: '1px solid var(--line-soft)',
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden', position: 'relative',
      boxShadow: '0 40px 80px -20px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(0 0 0 / 0.4) inset',
    }}>
      <div className="flex between" style={{ alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--line-soft)', background: 'oklch(0.13 0.006 250)' }}>
        <div className="flex gap-2">
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'oklch(0.55 0.18 25)' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'oklch(0.78 0.15 80)' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--accent)' }} />
        </div>
        <div className="mono" style={{ color: 'var(--fg-3)' }}>
          heck-orchestrator <span style={{ color: 'var(--fg-2)' }}>·</span> us-central-1 <span style={{ color: 'var(--fg-2)' }}>·</span> live
        </div>
        <div className="mono flex gap-2" style={{ color: 'var(--accent)', alignItems: 'center' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'blink 1.4s infinite' }} />
          REC
        </div>
      </div>

      <div className="flex between mono" style={{ padding: '10px 18px', borderBottom: '1px solid var(--line-soft)', color: 'var(--fg-3)', fontSize: 11 }}>
        <span>$ heck agents --tail</span>
        <span>{time} UTC</span>
      </div>

      <div style={{ padding: '18px', minHeight: 300, fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.7 }}>
        {visible.map((line, i) => {
          const isLatest = i === visible.length - 1;
          return (
            <div key={`${tick}-${i}`} style={{
              opacity: 0.3 + (i / visible.length) * 0.7,
              animation: isLatest ? 'fade-up .4s ease both' : 'none',
            }}>
              <span style={{ color: 'var(--fg-3)' }}>{String(i + 1).padStart(2, '0')}  </span>
              <span style={{ color: agentColor(line.agent), fontWeight: 500 }}>[{line.agent}]</span>
              <span style={{ color: 'var(--fg-2)' }}>  {line.msg}</span>
              {isLatest && <span style={{ color: 'var(--accent)', animation: 'blink 1s infinite', marginLeft: 4 }}>█</span>}
            </div>
          );
        })}
      </div>

      <div className="flex between mono" style={{ padding: '12px 18px', borderTop: '1px solid var(--line-soft)', background: 'oklch(0.13 0.006 250)', color: 'var(--fg-3)', fontSize: 11 }}>
        <span>5 agents · 1 orchestrator</span>
        <span>{visible.length * 7 + 14} tasks/hr</span>
        <span style={{ color: 'var(--accent)' }}>p95 1.4s</span>
        <span>$0.04/run</span>
      </div>

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent 0, transparent 2px, oklch(1 0 0 / 0.012) 3px)',
      }} />
    </div>
  );
}

function Ticker() {
  const items = [
    'agents shipped to production',
    '24/7 monitored',
    'hours reclaimed per client',
    'on-call humans, not chatbots',
    'audits in 5 business days',
    'evals before every deploy',
    'invoiced after the agent works',
  ];

  return (
    <div style={{
      marginTop: 96,
      borderTop: '1px solid var(--line-soft)',
      borderBottom: '1px solid var(--line-soft)',
      overflow: 'hidden', padding: '20px 0',
      maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
    }}>
      <div style={{
        display: 'flex', gap: 48, whiteSpace: 'nowrap',
        animation: 'ticker 38s linear infinite', width: 'max-content',
      }}>
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="mono" style={{ color: 'var(--fg-2)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            <span style={{ color: 'var(--accent)', marginRight: 16 }}>◆</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
