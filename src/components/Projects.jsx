import { useState, useEffect } from 'react';
import Icon from './Icon.jsx';
import LiveDemo from './Demos.jsx';
import { PROJECTS } from '../data.js';

export default function Projects() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <section id="work" className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>07 — What agents do</span>
          <h2>Here's what agents like these do<br/><span style={{ color: 'var(--fg-3)' }}>for a business like yours.</span></h2>
          <p className="lead">
            These are the kinds of agents we design and build — shown as capability demos, not client case studies. Click a card to see how each one works, the stack behind it, and the kind of outcome it's built to produce.
          </p>
        </div>

        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} onOpen={() => setOpen(i)} />
          ))}
        </div>
      </div>

      {open !== null && (
        <ProjectModal project={PROJECTS[open]} onClose={() => setOpen(null)} />
      )}

      <style>{`
        .proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 1080px) { .proj-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 680px) { .proj-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function ProjectCard({ p, index, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="card proj-card"
      style={{
        textAlign: 'left', padding: 0, display: 'flex', flexDirection: 'column',
        overflow: 'hidden', cursor: 'pointer',
        transition: 'transform .25s ease, border-color .25s ease',
      }}
    >
      <ProjectPreview project={p} />

      <div style={{ padding: 22, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="flex between" style={{ alignItems: 'center', marginBottom: 14 }}>
          <span className="chip" style={{ borderColor: p.color, color: p.color }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.color }} />
            {p.tag}
          </span>
          <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 10 }}>
            #{String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 600 }}>{p.name}</h3>
        <p className="mono" style={{ color: 'var(--fg-3)', marginTop: 4, fontSize: 11 }}>{p.client}</p>
        <p style={{ color: 'var(--fg-2)', marginTop: 14, fontSize: 14, lineHeight: 1.5, flex: 1 }}>
          {p.summary}
        </p>

        <div className="flex between" style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line-soft)', alignItems: 'center' }}>
          <span className="mono" style={{ color: 'var(--fg-2)', fontSize: 11 }}>
            <span style={{ color: p.color }}>{p.metrics[0].v}</span> {p.metrics[0].l}
          </span>
          <span className="flex gap-2" style={{ color: 'var(--fg-2)', fontSize: 12 }}>
            Open case
            <Icon name="arrow-up-right" size={12} />
          </span>
        </div>
      </div>

      <style>{`
        .proj-card:hover { transform: translateY(-4px); border-color: var(--line); }
      `}</style>
    </button>
  );
}

function ProjectPreview({ project }) {
  const c = project.color;
  const bg = 'oklch(0.12 0.006 250)';

  if (project.id === 'mailroom') {
    return (
      <div style={{ background: bg, padding: 18, height: 160, position: 'relative', borderBottom: '1px solid var(--line-soft)' }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--line-soft)' : 'none',
            opacity: i === 0 ? 1 : 0.4 + 0.2 * (3 - i),
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? c : 'var(--line)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {['re: discovery extension', 'wf: motion to compel', 'fwd: signed retainer', 'client intake — m. cho'][i]}
            </span>
            <span className="mono" style={{ color: c, fontSize: 10 }}>auto</span>
          </div>
        ))}
      </div>
    );
  }
  if (project.id === 'frontdesk') {
    return (
      <div style={{ background: bg, height: 160, position: 'relative', borderBottom: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute', width: 80 + i * 50, height: 80 + i * 50, borderRadius: '50%',
            border: `1px solid ${c}`,
            opacity: 0.6 - i * 0.18,
            animation: `pulse-ring 2.4s ease-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }} />
        ))}
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: c, display: 'grid', placeItems: 'center', color: 'oklch(0.18 0.04 60)' }}>
          <Icon name="phone" size={22} />
        </div>
        <style>{`@keyframes pulse-ring { 0% { transform: scale(0.6); opacity: 0.8 } 100% { transform: scale(1.4); opacity: 0 } }`}</style>
      </div>
    );
  }
  if (project.id === 'proposalforge') {
    return (
      <div style={{ background: bg, padding: 18, height: 160, borderBottom: '1px solid var(--line-soft)', display: 'flex', gap: 12 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            flex: 1, background: 'oklch(0.17 0.006 250)',
            border: `1px solid ${i === 1 ? c : 'var(--line-soft)'}`,
            borderRadius: 4, padding: 8, position: 'relative',
            transform: `translateY(${i * 4}px)`,
          }}>
            <div style={{ height: 4, background: i === 1 ? c : 'var(--line)', borderRadius: 2, marginBottom: 5, width: '70%' }} />
            <div style={{ height: 3, background: 'var(--line)', borderRadius: 2, marginBottom: 4 }} />
            <div style={{ height: 3, background: 'var(--line)', borderRadius: 2, marginBottom: 4, width: '80%' }} />
            <div style={{ height: 3, background: 'var(--line)', borderRadius: 2, marginBottom: 4, width: '60%' }} />
            <div style={{ height: 12, background: i === 1 ? c : 'var(--line-soft)', borderRadius: 2, marginTop: 12, opacity: i === 1 ? 0.6 : 0.3 }} />
          </div>
        ))}
      </div>
    );
  }
  if (project.id === 'scout') {
    return (
      <div style={{ background: bg, padding: 18, height: 160, borderBottom: '1px solid var(--line-soft)', display: 'flex', alignItems: 'end', gap: 4, justifyContent: 'space-around' }}>
        {Array.from({ length: 14 }).map((_, i) => {
          const h = 20 + Math.sin(i * 0.9) * 25 + (i % 4) * 8;
          const isHi = i === 9;
          return (
            <div key={i} style={{
              width: 8, height: `${h}%`, background: isHi ? c : 'var(--line)',
              borderRadius: 2, boxShadow: isHi ? `0 0 12px ${c}` : 'none',
            }} />
          );
        })}
      </div>
    );
  }
  if (project.id === 'reconcile') {
    return (
      <div style={{ background: bg, padding: 18, height: 160, borderBottom: '1px solid var(--line-soft)' }}>
        {[
          { l: 'AWS Inc.', a: '$1,240.00', m: true },
          { l: 'Shopify payouts', a: '$8,412.55', m: true },
          { l: 'Unknown vendor', a: '$340.00', m: false },
          { l: 'Stripe fees', a: '$214.18', m: true },
        ].map((r, i) => (
          <div key={i} className="flex between" style={{
            padding: '6px 0', borderBottom: i < 3 ? '1px solid var(--line-soft)' : 'none',
            fontFamily: 'var(--font-mono)', fontSize: 11,
          }}>
            <span style={{ color: 'var(--fg-2)' }}>{r.l}</span>
            <span className="flex gap-3" style={{ alignItems: 'center' }}>
              <span style={{ color: r.m ? c : 'var(--warn)' }}>{r.m ? 'matched' : 'review'}</span>
              <span style={{ color: 'var(--fg)' }}>{r.a}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ background: bg, padding: 18, height: 160, borderBottom: '1px solid var(--line-soft)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)',
        padding: '8px 10px', background: 'oklch(0.17 0.006 250)', border: '1px solid var(--line-soft)', borderRadius: 4,
      }}>
        <span style={{ color: c }}>? </span>what did we promise Acme on Q3?
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)',
        padding: '8px 10px', borderLeft: `2px solid ${c}`, paddingLeft: 12, lineHeight: 1.5,
      }}>
        Three deliverables by Sept 14: brand sprint <span style={{ color: 'var(--fg-3)' }}>(0:14:22)</span>, landing page <span style={{ color: 'var(--fg-3)' }}>(0:22:08)</span>, campaign launch <span style={{ color: 'var(--fg-3)' }}>(0:31:47)</span>.
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'color-mix(in oklab, var(--bg) 85%, transparent)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 32, animation: 'fade-up .2s ease both',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 16,
          maxWidth: 1080, width: '100%', maxHeight: '90vh', overflow: 'auto',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 20, right: 20, zIndex: 2,
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid var(--line)', background: 'var(--bg-1)',
            display: 'grid', placeItems: 'center',
          }}
        >
          <Icon name="x" size={16} />
        </button>

        <div style={{
          padding: '48px 48px 32px',
          borderBottom: '1px solid var(--line-soft)',
          background: `radial-gradient(circle at 100% 0%, ${project.color}22, transparent 50%)`,
        }}>
          <span className="chip" style={{ borderColor: project.color, color: project.color }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: project.color }} />
            {project.tag}
          </span>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: 20, fontWeight: 700 }}>{project.name}</h2>
          <p className="mono" style={{ color: 'var(--fg-3)', marginTop: 8 }}>{project.client}</p>
          <p style={{ marginTop: 22, maxWidth: 720, color: 'var(--fg-2)', fontSize: 17, lineHeight: 1.5 }}>{project.summary}</p>
        </div>

        <div style={{ padding: 48, borderBottom: '1px solid var(--line-soft)' }}>
          <div className="flex between" style={{ alignItems: 'center', marginBottom: 18 }}>
            <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Live agent demo
            </div>
            <div className="mono flex gap-2" style={{ color: project.color, fontSize: 11, alignItems: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: project.color, animation: 'blink 1.2s infinite' }} />
              running in sandbox
            </div>
          </div>
          <LiveDemo project={project} />
        </div>

        <div style={{ padding: '48px 48px 0' }}>
          <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            What an agent like this is built to do
          </div>
        </div>
        <div style={{ padding: '24px 48px 48px', borderBottom: '1px solid var(--line-soft)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {project.metrics.map((m, i) => (
            <div key={i}>
              <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{m.l}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.03em', marginTop: 8, color: project.color }}>{m.v}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: 48 }}>
          <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>
            Stack
          </div>
          <div className="flex gap-3" style={{ flexWrap: 'wrap' }}>
            {project.stack.map((s, i) => (
              <span key={i} className="chip">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
