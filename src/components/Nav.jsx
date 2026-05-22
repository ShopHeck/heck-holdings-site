import { useState, useEffect } from 'react';
import Icon from './Icon.jsx';

export default function Nav({ onCta }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkStyle = { color: 'var(--fg-2)', fontSize: 14, transition: 'color .2s' };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: '16px 0',
      background: scrolled ? 'color-mix(in oklab, var(--bg) 78%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line-soft)' : '1px solid transparent',
      transition: 'background .25s, border-color .25s',
    }}>
      <div className="wrap flex between" style={{ alignItems: 'center' }}>
        <a href="#top" className="flex gap-3" style={{ alignItems: 'center' }}>
          <Logo />
        </a>

        <div className="flex gap-8" style={{ alignItems: 'center' }}>
          <div className="flex gap-6 nav-links" style={{ alignItems: 'center' }}>
            <a href="#gap" style={linkStyle}>The Gap</a>
            <a href="#capabilities" style={linkStyle}>Capabilities</a>
            <a href="#calculator" style={linkStyle}>ROI</a>
            <a href="#work" style={linkStyle}>Work</a>
            <a href="#about" style={linkStyle}>About</a>
          </div>
          <button className="btn btn-primary" onClick={onCta} style={{ padding: '10px 18px', fontSize: 14 }}>
            Book audit
            <Icon name="arrow-right" size={14} />
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .nav-links { display: none !important; }
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
