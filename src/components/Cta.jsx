import { useEffect, useRef } from 'react';
import { Logo } from './Nav.jsx';

// Replace with your Cal.com handle, e.g. "heckholdings/audit"
const CAL_LINK = 'heckholdings/audit';

export default function Cta() {
  const calRef = useRef(null);

  useEffect(() => {
    if (!calRef.current) return;
    // Cal.com embed script — initializes a single time, then attaches inline.
    const w = window;
    if (!w.Cal) {
      const s = document.createElement('script');
      s.src = 'https://app.cal.com/embed/embed.js';
      s.async = true;
      s.onload = () => initCal();
      document.head.appendChild(s);
    } else {
      initCal();
    }
    function initCal() {
      try {
        w.Cal('init', { origin: 'https://cal.com' });
        w.Cal('inline', {
          elementOrSelector: calRef.current,
          calLink: CAL_LINK,
          config: { layout: 'month_view', theme: 'dark' },
        });
        w.Cal('ui', {
          theme: 'dark',
          styles: { branding: { brandColor: '#e0715b' } },
          hideEventTypeDetails: false,
        });
      } catch (e) { /* swallow during dev hot reload */ }
    }
  }, []);

  return (
    <section id="contact" style={{ padding: 'clamp(80px, 10vw, 140px) 0 0', position: 'relative' }}>
      <div className="wrap">
        <div style={{
          background: 'linear-gradient(180deg, var(--bg-1), var(--bg))',
          border: '1px solid var(--line)', borderRadius: 20,
          padding: 'clamp(48px, 7vw, 96px)',
          position: 'relative', overflow: 'hidden',
          boxShadow: 'inset 0 1px 0 0 color-mix(in oklab, white 8%, transparent), inset 0 -1px 0 0 color-mix(in oklab, black 30%, transparent), 0 30px 80px -30px color-mix(in oklab, black 60%, transparent)',
        }}>
          <div style={{
            position: 'absolute', top: '-40%', right: '-10%',
            width: 600, height: 600,
            background: 'radial-gradient(circle, var(--accent-glow), transparent 60%)',
            opacity: 0.6, pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="cta-grid">
            <div>
              <span className="eyebrow"><span className="dot"></span>07 — Start</span>
              <h2 style={{
                fontSize: 'clamp(40px, 5.5vw, 80px)',
                fontWeight: 700, marginTop: 24, letterSpacing: '-0.035em',
              }}>
                Your competitors got a one-month head start.
                <br />
                <span style={{ color: 'var(--accent)' }}>Take six months back.</span>
              </h2>
              <p style={{ marginTop: 28, color: 'var(--fg-2)', fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.5, maxWidth: 480 }}>
                Book the one-week audit. We'll show you the three agents your business should ship this quarter — with ROI math — before you write a single check.
              </p>
              <div className="mono" style={{ marginTop: 24, color: 'var(--fg-3)', fontSize: 12, letterSpacing: '0.04em', lineHeight: 1.7 }}>
                <div>· 30-minute call, no decks</div>
                <div>· You leave with three named opportunities</div>
                <div>· If you're not ready, we'll tell you</div>
              </div>
            </div>

            <div>
              <div
                ref={calRef}
                style={{
                  minHeight: 580,
                  width: '100%',
                  background: 'var(--bg)',
                  border: '1px solid var(--line-soft)',
                  borderRadius: 14,
                  overflow: 'hidden',
                }}
              >
                <div className="mono" style={{
                  padding: 40, color: 'var(--fg-3)', textAlign: 'center', fontSize: 12,
                }}>
                  Loading calendar… <br />
                  <a href={`https://cal.com/${CAL_LINK}`} style={{ color: 'var(--accent)' }} target="_blank" rel="noreferrer">
                    Or open in new tab →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 980px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      marginTop: 80, padding: '32px 0',
      borderTop: '1px solid var(--line-soft)',
    }}>
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
