import { useEffect, useState } from 'react';

function HeroSpotlight() {
  useEffect(() => {
    const root = document.getElementById('top');
    if (!root) return;
    const layer = document.createElement('div');
    layer.className = 'hero-spotlight';
    layer.setAttribute('aria-hidden', 'true');
    root.prepend(layer);

    let raf = null;
    let tx = 50, ty = 30;
    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      tx = x; ty = y;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          layer.style.setProperty('--mx', tx + '%');
          layer.style.setProperty('--my', ty + '%');
          raf = null;
        });
      }
    };
    root.addEventListener('mousemove', onMove);
    return () => {
      root.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
      layer.remove();
    };
  }, []);
  return null;
}

function RevealObserver() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const autoSelectors = [
      '.section-head',
      '#capabilities .cap-card',
      '#work .proj-card',
      '#calculator .calc-grid > *',
      '#gap .gap-grid > *',
      '#gap .gap-summary > *',
      '.svc-row',
      '.process-grid > *',
    ];
    autoSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        if (!el.hasAttribute('data-reveal')) {
          el.setAttribute('data-reveal', '');
          const delay = i * 80;
          if (delay && !el.style.getPropertyValue('--reveal-delay')) {
            el.style.setProperty('--reveal-delay', delay + 'ms');
          }
        }
      });
    });

    if (reduced) {
      document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('in-view'));
      return;
    }

    const observed = new WeakSet();
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in-view');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    const scan = () => {
      autoSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach((el, i) => {
          if (!el.hasAttribute('data-reveal')) {
            el.setAttribute('data-reveal', '');
            if (i > 0 && !el.style.getPropertyValue('--reveal-delay')) {
              el.style.setProperty('--reveal-delay', (i * 80) + 'ms');
            }
          }
        });
      });
      document.querySelectorAll('[data-reveal]').forEach(el => {
        if (!observed.has(el)) { observed.add(el); io.observe(el); }
      });
    };
    scan();
    const t1 = setTimeout(scan, 300);
    const t2 = setTimeout(scan, 1200);

    return () => { io.disconnect(); clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return null;
}

function SectionRail() {
  const sections = [
    { id: 'top',          label: 'Top' },
    { id: 'gap',          label: 'The Gap' },
    { id: 'days',         label: 'Days' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'calculator',   label: 'ROI' },
    { id: 'work',         label: 'Work' },
    { id: 'about',        label: 'About' },
    { id: 'contact',      label: 'Contact' },
  ];
  const [active, setActive] = useState('top');

  useEffect(() => {
    const observers = [];
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(s.id);
      }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <nav className="section-rail" aria-label="Section navigation">
      {sections.map(s => {
        const on = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            data-active={on ? '1' : '0'}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(s.id);
              if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
            }}
          >
            <span className="rail-dot" />
            <span className="rail-label">{s.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function CardTilt() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const SELECTOR = '#capabilities .cap-card, #work .proj-card';
    const tracked = new Set();
    let frame = null;

    const apply = (card, e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * 7;
      const ry = (px - 0.5) * 7;
      card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      card.style.setProperty('--glare-x', (px * 100).toFixed(1) + '%');
      card.style.setProperty('--glare-y', (py * 100).toFixed(1) + '%');
      card.style.setProperty('--glare-o', '1');
      card.classList.add('is-tilting');
      card.style.transform = `perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0)`;
    };

    const release = (card) => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--glare-o', '0');
      card.classList.remove('is-tilting');
      card.style.transform = '';
    };

    let lastEvent = null;
    const onMove = (e) => {
      lastEvent = e;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        if (!lastEvent) return;
        const cards = document.querySelectorAll(SELECTOR);
        tracked.forEach(c => { if (![...cards].includes(c)) release(c); });
        cards.forEach(card => {
          const r = card.getBoundingClientRect();
          const inside = lastEvent.clientX >= r.left && lastEvent.clientX <= r.right
                       && lastEvent.clientY >= r.top  && lastEvent.clientY <= r.bottom;
          if (inside) {
            tracked.add(card);
            apply(card, lastEvent);
          } else if (tracked.has(card)) {
            release(card); tracked.delete(card);
          }
        });
      });
    };

    const onLeave = () => { tracked.forEach(release); tracked.clear(); };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
      tracked.forEach(release);
    };
  }, []);
  return null;
}

function CursorGlow() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const layer = document.createElement('div');
    layer.className = 'cursor-glow';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);

    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let cx = tx, cy = ty;
    let raf = null;
    let visible = false;

    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      layer.style.setProperty('--cgx', cx + 'px');
      layer.style.setProperty('--cgy', cy + 'px');
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5 || visible) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };

    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!visible) { visible = true; layer.classList.add('on'); }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => { visible = false; layer.classList.remove('on'); };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      layer.remove();
    };
  }, []);
  return null;
}

function MagneticButtons() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    let active = null;
    const onMove = (e) => {
      const buttons = document.querySelectorAll('.btn-primary');
      buttons.forEach(btn => {
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const d = Math.hypot(dx, dy);
        const reach = 110;
        if (d < reach) {
          const k = (1 - d / reach) * 0.35;
          btn.style.transform = `translate(${dx * k}px, ${dy * k}px)`;
          active = btn;
        } else if (btn === active || btn.style.transform) {
          btn.style.transform = '';
        }
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return null;
}

export function GlobalEffects() {
  return (
    <>
      <HeroSpotlight />
      <RevealObserver />
      <SectionRail />
      <MagneticButtons />
      <CardTilt />
      <CursorGlow />
    </>
  );
}
