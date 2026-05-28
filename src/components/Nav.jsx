import { useState, useEffect } from 'react';
import Icon from './Icon.jsx';

const LINKS = [
  { href: '#gap', label: 'The Gap' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#calculator', label: 'ROI' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '/blog/', label: 'Blog' },
];

export default function Nav({ onCta }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on Esc or when a link is clicked; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const linkStyle = { color: 'var(--fg-2)', fontSize: 14, transition: 'color .2s' };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: '16px 0',
      background: scrolled || open ? 'color-mix(in oklab, var(--bg) 88%, transparent)' : 'transparent',
      backdropFilter: scrolled || open ? 'blur(14px) saturate(140%)' : 'none',
      borderBottom: scrolled || open ? '1px solid var(--line-soft)' : '1px solid transparent',
      transition: 'background .25s, border-color .25s',
    }}>
      <div className="wrap flex between" style={{ alignItems: 'center' }}>
        <a href="#top" className="flex gap-3" style={{ alignItems: 'center' }} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <div className="flex gap-8" style={{ alignItems: 'center' }}>
          <div className="flex gap-6 nav-links" style={{ alignItems: 'center' }}>
            {LINKS.map(l => (
              <a key={l.href} href={l.href} style={linkStyle}>{l.label}</a>
            ))}
          </div>
          <button
            className="btn btn-primary nav-cta"
            onClick={onCta}
            style={{ padding: '10px 18px', fontSize: 14 }}
          >
            Book audit
            <Icon name="arrow-right" size={14} />
          </button>
          <button
            className="nav-hamburger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open ? 'true' : 'false'}
            aria-controls="mobile-menu"
            onClick={() => setOpen(o => !o)}
          >
            <Icon name={open ? 'x' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className="nav-drawer"
        data-open={open ? '1' : '0'}
        role="dialog"
        aria-modal="true"
        aria-hidden={open ? 'false' : 'true'}
      >
        <div className="nav-drawer-inner">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="nav-drawer-link"
            >
              {l.label}
            </a>
          ))}
          <button
            className="btn btn-primary"
            onClick={() => { setOpen(false); onCta && onCta(); }}
            style={{ marginTop: 16, justifyContent: 'center' }}
          >
            Book audit
            <Icon name="arrow-right" size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .nav-hamburger {
          display: none;
          width: 40px; height: 40px;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: var(--bg-1);
          align-items: center; justify-content: center;
          color: var(--fg);
        }
        .nav-drawer {
          position: fixed; left: 0; right: 0; top: 64px;
          background: color-mix(in oklab, var(--bg) 95%, transparent);
          backdrop-filter: blur(20px) saturate(140%);
          border-bottom: 1px solid var(--line-soft);
          opacity: 0; pointer-events: none;
          transform: translateY(-8px);
          transition: opacity .22s ease, transform .22s ease;
          z-index: 49;
        }
        .nav-drawer[data-open="1"] {
          opacity: 1; pointer-events: auto; transform: none;
        }
        .nav-drawer-inner {
          display: flex; flex-direction: column;
          padding: 24px var(--pad-x) 32px;
          gap: 4px;
          max-width: var(--maxw); margin: 0 auto;
        }
        .nav-drawer-link {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--fg);
          padding: 14px 0;
          border-bottom: 1px solid var(--line-soft);
        }
        .nav-drawer-link:last-of-type { border-bottom: 0; }

        @media (max-width: 880px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: inline-flex; }
        }
      `}</style>
    </nav>
  );
}

export function Logo({ size = 28 }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg
        width={size} height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Heck Holdings"
        style={{ display: 'block', flexShrink: 0 }}
      >
        <rect x="15" y="12" width="7" height="40" rx="1.5" fill="var(--fg)" />
        <rect x="42" y="12" width="7" height="40" rx="1.5" fill="var(--fg)" />
        <circle cx="32" cy="32" r="4.5" fill="var(--accent)" />
      </svg>
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 17, letterSpacing: '-0.025em',
      }}>HECK</span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontWeight: 500,
        fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'var(--fg-3)',
        borderLeft: '1px solid var(--line)',
        paddingLeft: 12, marginLeft: -2,
        alignSelf: 'center',
      }}>HOLDINGS</span>
    </span>
  );
}
