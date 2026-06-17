import { useState, useEffect, useRef } from 'react';
import Icon from './Icon.jsx';

const LINKS = [
  { href: '#gap', label: 'The Gap' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#calculator', label: 'ROI' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '/services/', label: 'Services' },
  { href: '/industries/', label: 'Industries', dropdown: [
    { href: '/industries/hvac/', label: 'HVAC', icon: '🔥' },
    { href: '/industries/plumbing/', label: 'Plumbing', icon: '🔧' },
    { href: '/industries/electrical/', label: 'Electrical', icon: '⚡' },
    { href: '/industries/dental/', label: 'Dental', icon: '🦷' },
    { href: '/industries/', label: 'All industries →', icon: null },
  ]},
  { href: '/blog/', label: 'Blog' },
];

function NavDropdown({ link, linkStyle }) {
  const [hover, setHover] = useState(false);
  const timeout = useRef(null);

  const show = () => { clearTimeout(timeout.current); setHover(true); };
  const hide = () => { timeout.current = setTimeout(() => setHover(false), 180); };

  return (
    <span
      className="nav-dd-wrap"
      onMouseEnter={show}
      onMouseLeave={hide}
      style={{ position: 'relative' }}
    >
      <a href={link.href} style={linkStyle}>{link.label}</a>
      {hover && (
        <div className="nav-dd">
          {link.dropdown.map(d => (
            <a key={d.href} href={d.href} className={d.icon ? 'nav-dd-item' : 'nav-dd-all'}>
              {d.icon && <span className="nav-dd-icon">{d.icon}</span>}
              {d.label}
            </a>
          ))}
        </div>
      )}
    </span>
  );
}

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
            {LINKS.map(l => l.dropdown ? (
              <NavDropdown key={l.href} link={l} linkStyle={linkStyle} />
            ) : (
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
            <div key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="nav-drawer-link"
              >
                {l.label}
              </a>
              {l.dropdown && (
                <div className="nav-drawer-sub">
                  {l.dropdown.filter(d => d.icon).map(d => (
                    <a key={d.href} href={d.href} onClick={() => setOpen(false)} className="nav-drawer-sub-link">
                      <span>{d.icon}</span> {d.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
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

        .nav-dd {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          background: color-mix(in oklab, var(--bg) 94%, white 6%);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 8px;
          min-width: 200px;
          box-shadow: 0 16px 48px oklch(0 0 0 / 0.5);
          backdrop-filter: blur(20px) saturate(140%);
          z-index: 100;
          animation: ddFadeIn 0.15s ease;
        }
        @keyframes ddFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .nav-dd::before {
          content: '';
          position: absolute;
          top: -8px; left: 0; right: 0;
          height: 8px;
        }
        .nav-dd-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 8px;
          color: var(--fg-2);
          font-size: 14px;
          transition: background 0.15s, color 0.15s;
          text-decoration: none;
        }
        .nav-dd-item:hover {
          background: var(--bg-2);
          color: var(--fg);
        }
        .nav-dd-icon { font-size: 16px; }
        .nav-dd-all {
          display: block;
          padding: 10px 14px;
          margin-top: 4px;
          border-top: 1px solid var(--line-soft);
          color: var(--accent);
          font-size: 13px;
          font-family: var(--font-mono);
          text-decoration: none;
          transition: color 0.15s;
        }
        .nav-dd-all:hover { color: var(--fg); }
        .nav-drawer-sub {
          display: flex;
          flex-direction: column;
          padding: 4px 0 8px 16px;
          gap: 0;
        }
        .nav-drawer-sub-link {
          font-size: 16px;
          color: var(--fg-2);
          padding: 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
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
