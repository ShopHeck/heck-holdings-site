import { useState } from 'react';
import Icon from './Icon.jsx';
import { CAPABILITIES } from '../data.js';

export default function Capabilities() {
  const [hover, setHover] = useState(null);

  return (
    <section id="capabilities" className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>04 — Capabilities</span>
          <h2>Six categories of work<br/><span style={{ color: 'var(--fg-3)' }}>your team should never do again.</span></h2>
          <p className="lead">
            These aren't features. They're the categories of work we ship as autonomous agents. Hover any card to see the actual code path.
          </p>
        </div>

        <div className="cap-grid">
          {CAPABILITIES.map((c, i) => {
            const isHover = hover === i;
            return (
              <article
                key={i}
                className="card cap-card"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  padding: 32,
                  transition: 'transform .25s ease, border-color .25s ease',
                  transform: isHover ? 'translateY(-3px)' : 'none',
                  borderColor: isHover ? 'var(--accent)' : 'var(--line-soft)',
                }}
              >
                <div className="flex between" style={{ alignItems: 'flex-start' }}>
                  <span style={{
                    width: 42, height: 42, borderRadius: 8,
                    background: 'var(--bg-2)',
                    display: 'grid', placeItems: 'center',
                    color: isHover ? 'var(--accent)' : 'var(--fg-2)',
                    transition: 'color .25s',
                    border: '1px solid var(--line-soft)',
                  }}>
                    <Icon name={c.icon} size={20} />
                  </span>
                  <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 10, letterSpacing: '0.14em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 style={{ fontSize: 22, marginTop: 24, fontWeight: 600 }}>{c.title}</h3>
                <p style={{ color: 'var(--fg-2)', marginTop: 12, fontSize: 15, lineHeight: 1.5 }}>{c.body}</p>

                <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid var(--line-soft)' }}>
                  <div style={{ display: isHover ? 'none' : 'flex', gap: 8, alignItems: 'center' }}>
                    <Icon name="bolt" size={13} style={{ color: 'var(--accent)' }} />
                    <span className="mono" style={{ color: 'var(--fg)', fontSize: 12 }}>{c.metric}</span>
                  </div>
                  <div style={{
                    display: isHover ? 'flex' : 'none',
                    flexDirection: 'column', gap: 4,
                    fontFamily: 'var(--font-mono)', fontSize: 11.5,
                    color: 'var(--fg-2)',
                  }}>
                    {c.code.map((l, j) => (
                      <div key={j} style={{
                        animation: `fade-up .${3 + j}s ease both`,
                        animationDelay: `${j * 60}ms`,
                        color: j === c.code.length - 1 ? 'var(--accent)' : 'var(--fg-2)',
                      }}>{l}</div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .cap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 1080px) { .cap-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 680px) { .cap-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
