import { useState, useEffect, useRef, useMemo } from 'react';
import Icon from './Icon.jsx';

export default function LiveDemo({ project }) {
  const id = project.id;
  if (id === 'mailroom') return <MailroomDemo c={project.color} />;
  if (id === 'frontdesk') return <FrontDeskDemo c={project.color} />;
  if (id === 'proposalforge') return <ProposalForgeDemo c={project.color} />;
  if (id === 'scout') return <ScoutDemo c={project.color} />;
  if (id === 'reconcile') return <ReconcileDemo c={project.color} />;
  if (id === 'briefroom') return <BriefroomDemo c={project.color} />;
  return null;
}

function DemoChrome({ command, children, c, footer }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      background: 'oklch(0.10 0.006 250)',
      border: '1px solid var(--line-soft)',
      borderRadius: 10, overflow: 'hidden',
    }}>
      <div className="flex between" style={{
        padding: '12px 16px', borderBottom: '1px solid var(--line-soft)',
        background: 'oklch(0.12 0.006 250)', alignItems: 'center',
      }}>
        <div className="flex gap-2">
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.55 0.18 25)' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.78 0.15 80)' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
        </div>
        <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 11 }}>{command}</span>
        <span className="mono flex gap-2" style={{ color: c, alignItems: 'center', fontSize: 11 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: c, animation: 'blink 1.4s infinite' }} />
          LIVE
        </span>
      </div>
      <div style={{ position: 'relative' }}>{children}</div>
      {footer && (
        <div className="flex between mono" style={{
          padding: '10px 16px', borderTop: '1px solid var(--line-soft)',
          background: 'oklch(0.12 0.006 250)', color: 'var(--fg-3)', fontSize: 10.5,
        }}>{footer}</div>
      )}
    </div>
  );
}

function MailroomDemo({ c }) {
  const inbox = [
    { from: 'sarah@acme.co', subj: 'Re: refund for order #A-83291', intent: 'refund-request', prio: 'P1' },
    { from: 'mark@vendora.io', subj: 'Question about your services', intent: 'sales-inquiry', prio: 'P2' },
    { from: 'no-reply@stripe', subj: 'Receipt for $148.00', intent: 'system-notification', prio: 'P4' },
    { from: 'jenn@bigco.com', subj: 'URGENT: subpoena Re: matter 11-CV-882', intent: 'legal-urgent', prio: 'P0' },
    { from: 'newsletter@…', subj: 'This week in commercial litigation', intent: 'newsletter', prio: 'P4' },
    { from: 'paul@partner.law', subj: 'Lunch Thursday?', intent: 'personal', prio: 'P3' },
  ];
  const stages = ['Received', 'Classifying', 'Drafting reply', 'Routing', 'Resolved'];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 1200);
    return () => clearInterval(t);
  }, []);

  const items = inbox.map((m, i) => {
    const launch = i * 1.4;
    const progress = Math.max(0, tick - launch);
    const stage = Math.min(stages.length - 1, Math.floor(progress));
    return { ...m, stage };
  });

  return (
    <DemoChrome c={c} command="$ mailroom --tail --since=now"
      footer={<>
        <span>Inbox: 6 active</span>
        <span style={{ color: c }}>Auto-handled: {items.filter(i => i.stage >= 3).length}/6</span>
        <span>p95 latency 1.2s</span>
        <span>cost $0.04/run</span>
      </>}>
      <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, minHeight: 320 }}>
        <div>
          {items.map((m, i) => {
            const isActive = m.stage > 0 && m.stage < stages.length - 1;
            const isDone = m.stage === stages.length - 1;
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '14px 1fr auto', gap: 10,
                padding: '10px 0', borderBottom: i < items.length - 1 ? '1px solid var(--line-soft)' : 0,
                alignItems: 'center', opacity: m.stage === 0 ? 0.4 : 1,
                transition: 'opacity .4s',
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: isDone ? c : isActive ? 'var(--warn)' : 'var(--line)',
                  boxShadow: isActive ? `0 0 8px ${c}` : 'none',
                }} />
                <div style={{ minWidth: 0 }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.from}</div>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.subj}</div>
                </div>
                <span className="mono" style={{
                  fontSize: 10, color: isDone ? c : 'var(--fg-2)',
                  border: `1px solid ${isDone ? c : 'var(--line)'}`,
                  padding: '2px 6px', borderRadius: 4,
                }}>{stages[m.stage]}</span>
              </div>
            );
          })}
        </div>
        <div style={{
          background: 'oklch(0.12 0.006 250)',
          border: '1px solid var(--line-soft)',
          borderRadius: 6, padding: 14,
        }}>
          <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Pipeline</div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {stages.map((s, j) => {
              const count = items.filter(i => i.stage === j).length;
              return (
                <div key={j} className="flex between mono" style={{ fontSize: 11.5, padding: '6px 0' }}>
                  <span style={{ color: 'var(--fg-2)' }}>{s}</span>
                  <span style={{ color: count > 0 ? c : 'var(--fg-3)', fontWeight: 600 }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DemoChrome>
  );
}

function FrontDeskDemo({ c }) {
  const script = [
    { role: 'caller', text: 'Hi, do you have any openings this Saturday?' },
    { role: 'agent', text: 'Of course — for what kind of treatment?' },
    { role: 'caller', text: 'A hydrafacial, around lunchtime.' },
    { role: 'agent', text: 'I have 11:30 with Camila at the South Lamar location.' },
    { role: 'caller', text: 'Perfect, that works.' },
    { role: 'agent', text: 'Booked. You’ll get a text confirmation. Anything else?' },
    { role: 'caller', text: 'No, thank you!' },
    { role: 'agent', text: 'Have a great day.' },
  ];
  const [visible, setVisible] = useState([]);
  const idxRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      idxRef.current = (idxRef.current + 1) % (script.length + 2);
      if (idxRef.current === 0) setVisible([]);
      else if (idxRef.current <= script.length) setVisible(v => [...v, script[idxRef.current - 1]]);
    };
    const t = setInterval(tick, 1600);
    return () => clearInterval(t);
  }, []);

  const [phase, setPhase] = useState(0);
  useEffect(() => {
    let raf;
    const loop = () => { setPhase(p => p + 0.08); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <DemoChrome c={c} command="$ frontdesk --listen --line=+1-512-555-0188"
      footer={<>
        <span>Caller: +1 (512) ███-4421</span>
        <span style={{ color: c }}>Booking in progress</span>
        <span>Voice: ElevenLabs · "Amelia"</span>
      </>}>
      <div style={{ padding: 18, minHeight: 320 }}>
        <div style={{ display: 'flex', gap: 3, alignItems: 'center', height: 56, marginBottom: 18, padding: '0 4px' }}>
          {Array.from({ length: 64 }).map((_, i) => {
            const h = 8 + Math.abs(Math.sin(phase * 1.5 + i * 0.4)) * 36 + (i % 3) * 4;
            return (
              <div key={i} style={{
                width: 3, height: h,
                background: i < 64 * ((Math.sin(phase) + 1) / 2 + 0.3) ? c : 'var(--line)',
                borderRadius: 2, transition: 'height .08s linear',
              }} />
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 200, overflow: 'hidden' }}>
          {visible.slice(-5).map((m, i) => {
            const isCaller = m.role === 'caller';
            return (
              <div key={`${i}-${m.text}`} style={{
                display: 'flex',
                justifyContent: isCaller ? 'flex-start' : 'flex-end',
                animation: 'fade-up .35s ease both',
              }}>
                <div style={{
                  maxWidth: '75%', padding: '10px 14px', borderRadius: 12,
                  background: isCaller ? 'oklch(0.18 0.006 250)' : `oklch(from ${c} l c h / 0.18)`,
                  border: `1px solid ${isCaller ? 'var(--line-soft)' : c}`,
                  fontSize: 13, lineHeight: 1.45, color: 'var(--fg)',
                }}>
                  <div className="mono" style={{
                    fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: isCaller ? 'var(--fg-3)' : c, marginBottom: 4,
                  }}>{isCaller ? 'caller' : 'agent'}</div>
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DemoChrome>
  );
}

function ProposalForgeDemo({ c }) {
  const steps = [
    { name: 'Parse job-site photos', detail: '14 images · roof pitch 6:12 · 2,840 sqft' },
    { name: 'Extract scope items', detail: 'Tear-off + 30yr architectural + flashings' },
    { name: 'Price line items', detail: 'Auto-pulled vendor pricing · margin 22%' },
    { name: 'Generate proposal copy', detail: 'Tone: confident · 4 sections · 612 words' },
    { name: 'Brand & render PDF', detail: 'Heck Roofing template · 9 pages' },
    { name: 'Email + DocuSign envelope', detail: 'Sent to mark@buildco.com' },
  ];
  const stepDur = 1300;
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % (steps.length + 2)), stepDur);
    return () => clearInterval(t);
  }, []);
  const totalMs = (Math.min(active, steps.length)) * stepDur;
  const elapsed = (totalMs / 1000).toFixed(1);

  return (
    <DemoChrome c={c} command="$ proposalforge --job=BC-2241"
      footer={<>
        <span>Job: BuildCo · Office park reroof</span>
        <span style={{ color: c }}>Elapsed {elapsed}s / target 90s</span>
        <span>Output: branded PDF + DocuSign</span>
      </>}>
      <div style={{ padding: 18, minHeight: 320, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {steps.map((s, i) => {
            const isDone = i < active;
            const isActive = i === active;
            return (
              <div key={i} className="flex gap-3" style={{
                alignItems: 'flex-start', padding: '10px 12px',
                background: isActive ? 'oklch(0.16 0.006 250)' : 'transparent',
                border: `1px solid ${isActive ? c : 'transparent'}`,
                borderRadius: 6, transition: 'all .25s',
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                  background: isDone ? c : 'transparent',
                  border: `1.5px solid ${isDone || isActive ? c : 'var(--line)'}`,
                  display: 'grid', placeItems: 'center',
                  color: 'oklch(0.16 0.04 250)', marginTop: 2,
                }}>
                  {isDone && <Icon name="check" size={11} />}
                  {isActive && <span style={{ width: 6, height: 6, borderRadius: '50%', background: c, animation: 'blink 0.8s infinite' }} />}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>{s.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{
          background: 'oklch(0.96 0.005 80)', color: 'oklch(0.2 0.005 80)',
          borderRadius: 4, padding: '24px 22px', position: 'relative', overflow: 'hidden',
          aspectRatio: '0.77 / 1', minHeight: 220, fontFamily: 'var(--font-display)',
        }}>
          <div style={{ fontSize: 10, color: c, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>HECK ROOFING · PROPOSAL</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 12, letterSpacing: '-0.02em' }}>BuildCo Office Park Reroof</div>
          <div style={{ fontSize: 10, color: 'oklch(0.5 0.005 80)', marginTop: 4 }}>Prepared: May 21, 2026 · Valid 30 days</div>
          <div style={{ height: 1, background: 'oklch(0.85 0.005 80)', margin: '14px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {['Tear-off & disposal', '30yr architectural shingles', 'Flashings & boots', 'Cleanup & warranty'].map((l, j) => {
              const filled = active > j + 1;
              return (
                <div key={j} className="flex between" style={{ fontSize: 9, opacity: filled ? 1 : 0.25, transition: 'opacity .3s' }}>
                  <span>{l}</span>
                  <span style={{ fontWeight: 600 }}>{['$8,420', '$24,150', '$3,280', '$1,840'][j]}</span>
                </div>
              );
            })}
          </div>
          <div style={{ position: 'absolute', bottom: 24, left: 22, right: 22 }}>
            <div className="flex between" style={{ fontSize: 12, fontWeight: 700, paddingTop: 8, borderTop: '1px solid oklch(0.85 0.005 80)' }}>
              <span>TOTAL</span>
              <span style={{ color: c, opacity: active >= 4 ? 1 : 0.2, transition: 'opacity .3s' }}>$37,690</span>
            </div>
          </div>
          <div style={{
            position: 'absolute', left: 0, right: 0,
            height: 60, top: `${Math.min(active, steps.length) * 16}%`,
            background: `linear-gradient(180deg, transparent, ${c}25, transparent)`,
            transition: 'top .8s ease', pointerEvents: 'none',
          }} />
        </div>
      </div>
    </DemoChrome>
  );
}

function ScoutDemo({ c }) {
  const sites = useMemo(() => [
    'competitor-a.com/pricing', 'competitor-b.io/products', 'competitor-c.shop/sale',
    'competitor-d.co/blog', 'competitor-e.com/careers', 'competitor-f.io',
    'reddit r/supplements', 'amazon/competitor-a-asin', 'meta-ad-library/c-a',
    'meta-ad-library/c-b', 'g2.com/competitor-a', 'trustpilot/competitor-b',
  ], []);
  const alerts = useMemo(() => [
    { who: 'Competitor A', what: 'price drop · −12% on flagship', sev: 'high' },
    { who: 'Competitor C', what: 'launched bundle SKU · BOGO 50%', sev: 'med' },
    { who: 'Competitor B', what: 'hired VP of Growth · ex-Athletic Greens', sev: 'med' },
    { who: 'Reddit', what: '38-comment thread mentions Competitor A', sev: 'low' },
  ], []);
  const [scanIdx, setScanIdx] = useState(0);
  const [alertCount, setAlertCount] = useState(1);
  useEffect(() => {
    const t1 = setInterval(() => setScanIdx(s => (s + 1) % sites.length), 280);
    const t2 = setInterval(() => setAlertCount(a => (Math.min(alerts.length, a + 1) === alerts.length ? 1 : a + 1)), 2200);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [sites.length, alerts.length]);

  return (
    <DemoChrome c={c} command="$ scout --refresh=4h --sites=38"
      footer={<>
        <span>38 sites · {sites.length} this batch</span>
        <span style={{ color: c }}>Active diff: {alertCount}</span>
        <span>Brief due: Mon 7:00am</span>
      </>}>
      <div style={{ padding: 18, minHeight: 320, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div>
          <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Scanning</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
            {sites.map((s, i) => {
              const isCurr = i === scanIdx;
              return (
                <div key={i} className="flex gap-2" style={{
                  alignItems: 'center', color: isCurr ? c : 'var(--fg-3)',
                  background: isCurr ? `oklch(from ${c} l c h / 0.1)` : 'transparent',
                  padding: '3px 6px', borderRadius: 3, transition: 'all .15s',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: isCurr ? c : 'var(--line)' }} />
                  <span style={{ flex: 1 }}>{s}</span>
                  <span style={{ fontSize: 9 }}>{isCurr ? 'GET 200' : 'ok'}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Diff alerts</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {alerts.slice(0, alertCount).map((a, i) => {
              const sevColor = a.sev === 'high' ? 'oklch(0.70 0.18 25)' : a.sev === 'med' ? 'oklch(0.78 0.15 65)' : 'var(--fg-2)';
              return (
                <div key={i} style={{
                  padding: '12px 14px', border: `1px solid ${sevColor}40`,
                  background: `oklch(from ${sevColor} l c h / 0.06)`,
                  borderRadius: 6, animation: 'fade-up .3s ease both',
                }}>
                  <div className="flex between" style={{ marginBottom: 4 }}>
                    <span className="mono" style={{ fontSize: 10, color: sevColor, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{a.sev}</span>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>{i + 1}m ago</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{a.who}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 4 }}>{a.what}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DemoChrome>
  );
}

function ReconcileDemo({ c }) {
  const txns = useMemo(() => [
    { date: '05/14', desc: 'AWS Inc.', amt: -1240.00, vendor: 'AWS', status: 'pending' },
    { date: '05/15', desc: 'Shopify payouts', amt: 8412.55, vendor: 'Shopify', status: 'pending' },
    { date: '05/16', desc: 'Unknown vendor LLC', amt: -340.00, vendor: '?', status: 'pending' },
    { date: '05/17', desc: 'Stripe fees', amt: -214.18, vendor: 'Stripe', status: 'pending' },
    { date: '05/18', desc: 'Google Workspace', amt: -180.00, vendor: 'Google', status: 'pending' },
    { date: '05/19', desc: 'Adobe Cloud', amt: -89.99, vendor: 'Adobe', status: 'pending' },
    { date: '05/19', desc: 'Shopify payouts', amt: 9214.22, vendor: 'Shopify', status: 'pending' },
    { date: '05/20', desc: 'Klaviyo', amt: -420.00, vendor: 'Klaviyo', status: 'pending' },
  ], []);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % (txns.length + 4)), 600);
    return () => clearInterval(t);
  }, [txns.length]);

  const rows = txns.map((r, i) => ({
    ...r,
    status: i < step ? (r.vendor === '?' ? 'review' : 'matched') : 'pending',
  }));
  const matched = rows.filter(r => r.status === 'matched').length;
  const flagged = rows.filter(r => r.status === 'review').length;

  return (
    <DemoChrome c={c} command="$ reconcile --period=may-2026 --xero=connected"
      footer={<>
        <span>Bank → Xero</span>
        <span style={{ color: c }}>Matched {matched}/{txns.length}</span>
        <span style={{ color: 'var(--warn)' }}>Review {flagged}</span>
        <span>Close in 2d (vs 24d manual)</span>
      </>}>
      <div style={{ padding: 18, minHeight: 320, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '60px 1fr 90px 80px',
          gap: 8, padding: '8px 12px', color: 'var(--fg-3)', fontSize: 10,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          borderBottom: '1px solid var(--line-soft)',
        }}>
          <span>Date</span><span>Description</span><span style={{ textAlign: 'right' }}>Amount</span><span style={{ textAlign: 'right' }}>Status</span>
        </div>
        {rows.map((r, i) => {
          const isActive = i === step - 1;
          const statusColor = r.status === 'matched' ? c : r.status === 'review' ? 'var(--warn)' : 'var(--fg-3)';
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '60px 1fr 90px 80px',
              gap: 8, padding: '8px 12px', alignItems: 'center',
              borderBottom: '1px solid var(--line-soft)',
              background: isActive ? `oklch(from ${c} l c h / 0.06)` : 'transparent',
              transition: 'background .3s',
            }}>
              <span style={{ color: 'var(--fg-3)' }}>{r.date}</span>
              <span style={{ color: 'var(--fg-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.desc}</span>
              <span style={{ textAlign: 'right', color: r.amt > 0 ? c : 'var(--fg)' }}>
                {r.amt > 0 ? '+' : ''}${Math.abs(r.amt).toFixed(2)}
              </span>
              <span style={{
                textAlign: 'right', color: statusColor,
                fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                {r.status === 'matched' && '✓ matched'}
                {r.status === 'review' && '! review'}
                {r.status === 'pending' && '· pending'}
              </span>
            </div>
          );
        })}
      </div>
    </DemoChrome>
  );
}

function BriefroomDemo({ c }) {
  const question = 'what did we promise Acme on the Q3 launch?';
  const answer = 'Three deliverables by Sept 14: brand sprint (cited 0:14:22 · Acme kickoff), landing page MVP (0:22:08), and campaign launch via Klaviyo (0:31:47). Tom committed to weekly status syncs on Fridays.';
  const sources = [
    { meeting: 'Acme · Kickoff', date: 'Jul 22', stamp: '0:14:22' },
    { meeting: 'Acme · Scope review', date: 'Jul 29', stamp: '0:22:08' },
    { meeting: 'Acme · Production sync', date: 'Aug 12', stamp: '0:31:47' },
  ];

  const [qChars, setQChars] = useState(0);
  const [aChars, setAChars] = useState(0);
  const [phase, setPhase] = useState('typing-q');

  useEffect(() => {
    let t;
    if (phase === 'typing-q') {
      if (qChars < question.length) t = setTimeout(() => setQChars(c => c + 1), 35);
      else t = setTimeout(() => setPhase('thinking'), 400);
    } else if (phase === 'thinking') {
      t = setTimeout(() => setPhase('typing-a'), 1100);
    } else if (phase === 'typing-a') {
      if (aChars < answer.length) t = setTimeout(() => setAChars(c => c + 2), 22);
      else t = setTimeout(() => setPhase('done'), 1800);
    } else if (phase === 'done') {
      t = setTimeout(() => { setQChars(0); setAChars(0); setPhase('typing-q'); }, 2400);
    }
    return () => clearTimeout(t);
  }, [phase, qChars, aChars]);

  return (
    <DemoChrome c={c} command="$ briefroom query --index=meetings"
      footer={<>
        <span>8,412 meetings indexed</span>
        <span style={{ color: c }}>Avg lookup 2.4s</span>
        <span>Sources cited inline</span>
      </>}>
      <div style={{ padding: 22, minHeight: 320 }}>
        <div style={{
          padding: '14px 18px', border: '1px solid var(--line-soft)',
          background: 'oklch(0.13 0.006 250)', borderRadius: 8,
          fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg)',
        }}>
          <span style={{ color: c, marginRight: 8 }}>?</span>
          {question.slice(0, qChars)}
          {phase === 'typing-q' && <span style={{ color: c, animation: 'blink 1s infinite' }}>▍</span>}
        </div>

        {phase === 'thinking' && (
          <div className="mono" style={{
            marginTop: 18, padding: '12px 18px',
            color: 'var(--fg-3)', fontSize: 12,
            display: 'flex', gap: 6, alignItems: 'center',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: c, animation: 'blink 0.6s infinite' }} />
            searching 8,412 meetings · embedding query · cosine match…
          </div>
        )}

        {(phase === 'typing-a' || phase === 'done') && (
          <div style={{
            marginTop: 18, padding: '16px 18px',
            borderLeft: `2px solid ${c}`,
            fontSize: 14, lineHeight: 1.6, color: 'var(--fg)',
          }}>
            {answer.slice(0, aChars)}
            {phase === 'typing-a' && <span style={{ color: c, animation: 'blink 1s infinite' }}>▍</span>}
          </div>
        )}

        {phase === 'done' && (
          <div style={{ marginTop: 18, animation: 'fade-up .4s ease both' }}>
            <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
              Sources
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {sources.map((s, i) => (
                <div key={i} className="flex between mono" style={{
                  padding: '8px 12px', fontSize: 11.5,
                  background: 'oklch(0.13 0.006 250)',
                  border: '1px solid var(--line-soft)',
                  borderRadius: 5,
                }}>
                  <span style={{ color: 'var(--fg-2)' }}>{s.meeting}</span>
                  <span style={{ color: 'var(--fg-3)' }}>{s.date} · {s.stamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DemoChrome>
  );
}
