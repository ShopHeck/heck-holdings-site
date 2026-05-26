import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const DAYS_MAX = 90;
const HECK_MILESTONES = [
  { day: 1,  title: 'Audit kickoff',           delta: 'Workshop · 3 founders, 2 ops' },
  { day: 5,  title: 'Audit delivered',          delta: '3 candidate agents, ranked' },
  { day: 12, title: 'Mailroom v1 live',         delta: '−22 hrs / wk' },
  { day: 18, title: 'Revenue lift detected',    delta: '+$3,400 / wk reclaimed' },
  { day: 28, title: 'FrontDesk voice live',     delta: '−31 hrs / wk total' },
  { day: 45, title: 'Compounding',              delta: '+$14,200 / wk · bookings +12%' },
  { day: 70, title: 'Reconcile live + handoff', delta: 'Team trained, on-call rota' },
  { day: 88, title: 'Status report',            delta: '3 agents, $1.15M/yr run-rate reclaimed' },
];
const TRAD_MILESTONES = [
  { day: 0,  title: 'Engagement signed',  delta: 'SOW v4 countersigned' },
  { day: 30, title: 'Discovery readout',  delta: '46-slide deck' },
  { day: 55, title: 'PoC scope deck',     delta: 'v3 · scope clarification' },
  { day: 75, title: 'Tooling RFP',        delta: '4 vendors selected for IT review' },
  { day: 90, title: 'Awaiting committee', delta: 'Steering Cmte slot: Jul 14' },
];

function heckRevenueAt(day) {
  const steps = [
    { from: 12, to: 28,           rate: 485 },
    { from: 28, to: 70,           rate: 2030 },
    { from: 70, to: DAYS_MAX + 1, rate: 3150 },
  ];
  let total = 0;
  for (const s of steps) {
    const start = Math.max(s.from, 0);
    const end = Math.min(day, s.to);
    if (end > start) total += (end - start) * s.rate;
  }
  return Math.round(total);
}
const dayToPct = (d) => (d / DAYS_MAX) * 100;
const tradStatusFor = (d) => {
  if (d < 5)  return 'Negotiating SOW redlines.';
  if (d < 30) return 'In discovery. Interviewing stakeholders.';
  if (d < 55) return 'Reviewing 46-slide discovery readout.';
  if (d < 75) return 'PoC scope deck v3 in legal.';
  if (d < 90) return 'RFP out to four tooling vendors.';
  return 'Awaiting steering committee slot · Jul 14.';
};

export default function Days() {
  return (
    <section id="days" className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>03 — Days, not months</span>
          <h2>Both paths cost the same.<br/><span style={{ color: 'var(--fg-3)' }}>Look what one of them did with 90 days.</span></h2>
          <p className="lead">
            Drag the scrubber. Two engagements, both starting Day&nbsp;0. The top lane is what we ship. The bottom is what the industry calls "moving fast." Revenue panel ticks live as you scrub.
          </p>
        </div>
        <ScrubberStage />
      </div>
      <DaysStyles />
    </section>
  );
}

function ScrubberStage() {
  const [day, setDay] = useState(0);
  const [playing, setPlaying] = useState(true);
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const lastTRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!trackRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setPlaying(false); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        setPlaying(true);
      }
    }, { threshold: 0.35 });
    io.observe(trackRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const tick = (t) => {
      if (lastTRef.current == null) lastTRef.current = t;
      const dt = (t - lastTRef.current) / 1000;
      lastTRef.current = t;
      setDay((d) => {
        const next = d + dt * 11;
        if (next >= DAYS_MAX) { setPlaying(false); return DAYS_MAX; }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTRef.current = null;
    };
  }, [playing]);

  const beginDrag = useCallback((clientX) => {
    setPlaying(false);
    const upd = (cx) => {
      const r = trackRef.current?.getBoundingClientRect();
      if (!r) return;
      const x = Math.max(0, Math.min(1, (cx - r.left) / r.width));
      setDay(x * DAYS_MAX);
    };
    upd(clientX);
    const onMove = (e) => upd(e.touches ? e.touches[0].clientX : e.clientX);
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
  }, []);

  const onTrackPointerDown = (e) => {
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    beginDrag(cx);
  };
  const replay = () => { setDay(0); lastTRef.current = null; setPlaying(true); };
  const pause = () => setPlaying(false);
  const play = () => {
    if (day >= DAYS_MAX) { setDay(0); }
    lastTRef.current = null;
    setPlaying(true);
  };

  const dayInt = Math.round(day);
  const revenue = heckRevenueAt(day);
  const heckShipped = HECK_MILESTONES.filter(
    m => m.day <= day && /live|delivered/i.test(m.title)
  ).length;

  const axisTicks = [0, 15, 30, 45, 60, 75, 90];

  return (
    <div className="scrub-stage">
      <div className="scrub-hud">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <span className="eyebrow"><span className="dot"></span>live prototype</span>
          <span className="illustrative-pill">illustrative numbers</span>
        </div>
        <div className="mono" style={{ color: 'var(--fg-3)' }}>
          DAY <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{String(dayInt).padStart(2, '0')}</span> / 90
        </div>
        <div className="scrub-ctrls">
          {playing ? (
            <button className="scrub-btn" onClick={pause}><DaysSvg name="pause" /> Pause</button>
          ) : (
            <button className="scrub-btn primary" onClick={play}><DaysSvg name="play" /> {day >= DAYS_MAX ? 'Replay' : 'Play'}</button>
          )}
          <button className="scrub-btn" onClick={replay}><DaysSvg name="reset" /> Reset</button>
        </div>
      </div>

      <div className="scrub-grid">
        <div
          className="scrub-canvas"
          ref={trackRef}
          onMouseDown={onTrackPointerDown}
          onTouchStart={onTrackPointerDown}
        >
          <div className="scrub-track-wrap">
            <div className="scrub-axis">
              {axisTicks.map(d => {
                const isFirst = d === 0;
                const isLast = d === DAYS_MAX;
                return (
                  <div key={d} className="scrub-axis-tick" style={{
                    left: `${dayToPct(d)}%`,
                    transform: isFirst ? 'translateX(0)' : isLast ? 'translateX(-100%)' : 'translateX(-50%)',
                    alignItems: isFirst ? 'flex-start' : isLast ? 'flex-end' : 'center',
                  }}>
                    <span>day {String(d).padStart(2, '0')}</span>
                    <i></i>
                  </div>
                );
              })}
            </div>

            <Lane kind="heck" name="Heck Holdings" tagline="4 agents shipped" milestones={HECK_MILESTONES} day={day} />
            <Lane kind="trad" name="Traditional consultancy" tagline="0 agents shipped" milestones={TRAD_MILESTONES} day={day} />

            <div className="scrub-thumb-line" style={{ left: `${dayToPct(day)}%` }}></div>
            <div
              className="scrub-thumb"
              style={{ left: `${dayToPct(day)}%`, top: 42 }}
              onMouseDown={(e) => { e.stopPropagation(); beginDrag(e.clientX); }}
              onTouchStart={(e) => { e.stopPropagation(); beginDrag(e.touches[0].clientX); }}
            >
              <div
                className="scrub-thumb-flag"
                style={{
                  transform: dayInt <= 4 ? 'translateX(-12px)'
                    : dayInt >= 86 ? 'translateX(calc(-100% + 12px))'
                      : 'translateX(-50%)',
                }}
              >
                DAY {String(dayInt).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        <div className="scrub-side">
          <Receipt revenue={revenue} dayInt={dayInt} heckShipped={heckShipped} />
        </div>
      </div>
    </div>
  );
}

function Lane({ kind, name, milestones, day }) {
  let activeIdx = -1;
  for (let i = 0; i < milestones.length; i++) {
    if (day >= milestones[i].day) activeIdx = i;
  }
  const passedCount = activeIdx + 1;

  return (
    <div className={`scrub-lane ${kind}`}>
      <div className="scrub-lane-label">
        <span className="scrub-lane-name">{name}</span>
        <span className="scrub-lane-count">{passedCount}/{milestones.length} milestones</span>
      </div>
      <div className="scrub-rail">
        <div className="scrub-rail-fill" style={{ width: `${Math.min(100, dayToPct(day))}%` }}></div>
      </div>
      {milestones.map((m, i) => {
        const isPassed = day >= m.day;
        const isActive = i === activeIdx;
        const anchor = m.day <= 12 ? 'anchor-left' : m.day >= DAYS_MAX - 12 ? 'anchor-right' : '';
        return (
          <div key={i} className={`milestone ${isPassed ? 'passed' : ''} ${isActive ? 'active' : ''}`} style={{ left: `${dayToPct(m.day)}%` }}>
            <div className="milestone-dot"></div>
            <div className={`milestone-card ${anchor}`}>
              <div className="day">Day {String(m.day).padStart(2, '0')}</div>
              <div className="title">{m.title}</div>
              <div className="delta">{m.delta}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Receipt({ revenue, dayInt, heckShipped }) {
  const hoursReclaimed = useMemo(() => {
    const wkRate = heckShipped >= 3 ? 53 : heckShipped >= 2 ? 31 : heckShipped >= 1 ? 22 : 0;
    return Math.round((wkRate / 7) * Math.max(0, dayInt - (heckShipped >= 1 ? 12 : 0)));
  }, [dayInt, heckShipped]);

  const paybackHit = revenue >= 18000;

  return (
    <div className="receipt">
      <div className="receipt-h">Reclaimed via Heck path</div>
      <div className="receipt-big">${revenue.toLocaleString()}</div>
      <div className="receipt-sub">
        Cumulative labor reclaimed across {heckShipped} agent{heckShipped === 1 ? '' : 's'} in production. Updates as you scrub.
      </div>

      <div className="receipt-grid">
        <div><div className="lbl">Agents live</div><div className="val" style={{ color: 'var(--accent)' }}>{heckShipped}</div></div>
        <div><div className="lbl">Hours reclaimed</div><div className="val">{hoursReclaimed.toLocaleString()}</div></div>
        <div><div className="lbl">Day of engagement</div><div className="val">{String(dayInt).padStart(2, '0')}</div></div>
        <div><div className="lbl">Payback hit</div><div className="val" style={{ color: paybackHit ? 'oklch(0.86 0.17 145)' : 'var(--fg-3)' }}>{paybackHit ? '✓ yes' : 'not yet'}</div></div>
      </div>

      <div className="trad-stamp">
        <div className="lbl">Meanwhile, traditional path</div>
        <div className="msg">{tradStatusFor(dayInt)}</div>
      </div>
    </div>
  );
}

function DaysSvg({ name, size = 12 }) {
  const p = { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (name === 'play')  return <svg {...p}><path d="M4 3l9 5-9 5V3z" fill="currentColor" stroke="none"/></svg>;
  if (name === 'pause') return <svg {...p}><rect x="4" y="3" width="3" height="10" fill="currentColor" stroke="none"/><rect x="9" y="3" width="3" height="10" fill="currentColor" stroke="none"/></svg>;
  if (name === 'reset') return <svg {...p}><path d="M3 8a5 5 0 1 0 1.5-3.5L3 6"/><path d="M3 3v3h3"/></svg>;
  return null;
}

function DaysStyles() {
  return (
    <style>{`
      #days .scrub-stage {
        background: oklch(0.11 0.006 250);
        border: 1px solid var(--line-soft);
        border-radius: 18px; overflow: hidden; position: relative;
        box-shadow: 0 40px 80px -30px oklch(0 0 0 / 0.55), inset 0 1px 0 0 color-mix(in oklab, white 5%, transparent);
      }
      #days .scrub-hud {
        display: grid; grid-template-columns: 1fr auto auto; gap: 16px;
        align-items: center; padding: 16px 22px;
        border-bottom: 1px solid var(--line-soft);
        background: oklch(0.13 0.006 250);
        font-family: var(--font-mono); font-size: 11.5px;
      }
      #days .illustrative-pill {
        display: inline-flex; align-items: center; gap: 6px;
        font-family: var(--font-mono); font-size: 9.5px;
        letter-spacing: 0.16em; text-transform: uppercase;
        color: var(--warn); padding: 4px 9px; border-radius: 999px;
        border: 1px dashed color-mix(in oklab, var(--warn) 60%, transparent);
        background: color-mix(in oklab, var(--warn) 5%, transparent);
      }
      #days .scrub-grid { display: grid; grid-template-columns: 1.55fr 1fr; gap: 0; }
      #days .scrub-side {
        border-left: 1px solid var(--line-soft);
        padding: 28px 24px; background: oklch(0.10 0.006 250);
      }
      @media (max-width: 980px) {
        #days .scrub-grid { grid-template-columns: 1fr; }
        #days .scrub-side { border-left: 0; border-top: 1px solid var(--line-soft); }
      }
      @media (max-width: 720px) {
        #days .scrub-hud { grid-template-columns: 1fr; gap: 10px; }
        #days .scrub-ctrls { justify-content: flex-start; }
      }
      #days .scrub-canvas { position: relative; height: 560px; padding: 28px 32px 36px; }
      @media (max-width: 980px) {
        #days .scrub-canvas { height: 620px; padding: 22px 18px 28px; }
      }
      #days .scrub-track-wrap { position: relative; height: 100%; }
      #days .scrub-axis {
        position: absolute; left: 0; right: 0; top: 24px; height: 36px;
        display: flex; align-items: center;
        font-family: var(--font-mono); font-size: 10.5px;
        letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-3);
      }
      #days .scrub-axis-tick { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 5px; }
      #days .scrub-axis-tick span { line-height: 1; }
      #days .scrub-axis-tick i { width: 1px; height: 8px; background: var(--line); display: block; }
      #days .scrub-lane {
        position: absolute; left: 0; right: 0; height: 134px;
        border-top: 1px solid var(--line-soft); border-bottom: 1px solid var(--line-soft);
      }
      #days .scrub-lane.heck { top: 90px; background: color-mix(in oklab, var(--accent) 4%, transparent); }
      #days .scrub-lane.trad { top: 360px; background: color-mix(in oklab, var(--danger) 3%, transparent); }
      #days .scrub-lane-label {
        position: absolute; left: 0; top: 12px;
        font-family: var(--font-mono); font-size: 10px;
        letter-spacing: 0.16em; text-transform: uppercase;
        color: var(--fg-3); display: flex; align-items: center; gap: 8px;
      }
      #days .scrub-lane-name {
        font-family: var(--font-display); font-weight: 600; font-size: 16px;
        letter-spacing: -0.01em; text-transform: none;
      }
      #days .scrub-lane.heck .scrub-lane-name { color: var(--accent); }
      #days .scrub-lane.trad .scrub-lane-name { color: var(--fg-2); }
      #days .scrub-lane-count {
        font-family: var(--font-mono); font-size: 10.5px;
        color: var(--fg-3); letter-spacing: 0.08em;
      }
      #days .scrub-lane.heck .scrub-lane-count { color: var(--accent); }
      #days .scrub-rail {
        position: absolute; left: 0; right: 0; top: 50%;
        height: 2px; background: color-mix(in oklab, var(--line) 60%, transparent);
        transform: translateY(-50%);
      }
      #days .scrub-rail-fill {
        position: absolute; left: 0; top: 0; bottom: 0;
        background: linear-gradient(90deg, color-mix(in oklab, var(--accent) 60%, transparent), var(--accent));
        box-shadow: 0 0 18px var(--accent-glow);
      }
      #days .scrub-lane.trad .scrub-rail-fill {
        background: linear-gradient(90deg, color-mix(in oklab, var(--danger) 30%, transparent), color-mix(in oklab, var(--danger) 50%, transparent));
        box-shadow: none;
      }
      #days .milestone {
        position: absolute; top: 50%;
        transform: translate(-50%, -50%); pointer-events: none; z-index: 2;
      }
      #days .milestone-dot {
        width: 14px; height: 14px; border-radius: 50%;
        background: var(--bg); border: 2px solid var(--line);
        transition: background .3s, border-color .3s, box-shadow .3s, transform .3s;
      }
      #days .milestone.passed .milestone-dot {
        background: var(--accent); border-color: var(--accent);
        box-shadow: 0 0 0 4px color-mix(in oklab, var(--accent) 24%, transparent), 0 0 22px var(--accent-glow);
        transform: scale(1.1);
      }
      #days .scrub-lane.trad .milestone.passed .milestone-dot {
        background: var(--danger); border-color: var(--danger);
        box-shadow: 0 0 0 4px color-mix(in oklab, var(--danger) 22%, transparent);
      }
      #days .milestone-card {
        position: absolute; width: 200px; padding: 14px 16px;
        background: oklch(0.09 0.006 250); border: 1px solid var(--line);
        border-radius: 10px; font-size: 12px; text-align: left;
        color: var(--fg-2); line-height: 1.4; opacity: 0; pointer-events: none;
        box-shadow: 0 18px 38px -16px oklch(0 0 0 / 0.55);
        transition: opacity .35s ease, transform .35s cubic-bezier(.2,.7,.2,1);
      }
      #days .milestone-card .day {
        font-family: var(--font-mono); font-size: 10px;
        letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3);
      }
      #days .milestone-card .title {
        font-family: var(--font-display); font-weight: 600; font-size: 15px;
        color: var(--fg); margin-top: 4px; letter-spacing: -0.01em;
      }
      #days .milestone-card .delta {
        font-family: var(--font-mono); font-size: 11px;
        margin-top: 6px; color: var(--accent);
      }
      #days .scrub-lane.trad .milestone-card .delta { color: var(--fg-3); }
      #days .milestone.active .milestone-card { opacity: 1; }
      #days .scrub-lane.heck .milestone-card {
        top: calc(50% + 22px); left: 50%; transform: translate(-50%, 8px);
      }
      #days .scrub-lane.heck .milestone.active .milestone-card { transform: translate(-50%, 0); }
      #days .scrub-lane.trad .milestone-card {
        bottom: calc(50% + 22px); left: 50%; transform: translate(-50%, -8px);
      }
      #days .scrub-lane.trad .milestone.active .milestone-card { transform: translate(-50%, 0); }
      #days .scrub-lane.heck .milestone-card.anchor-left,
      #days .scrub-lane.trad .milestone-card.anchor-left { left: -7px; right: auto; }
      #days .scrub-lane.heck .milestone-card.anchor-right,
      #days .scrub-lane.trad .milestone-card.anchor-right { left: auto; right: -7px; }
      #days .scrub-lane.heck .milestone-card.anchor-left,
      #days .scrub-lane.heck .milestone-card.anchor-right { transform: translate(0, 8px); }
      #days .scrub-lane.trad .milestone-card.anchor-left,
      #days .scrub-lane.trad .milestone-card.anchor-right { transform: translate(0, -8px); }
      #days .scrub-lane.heck .milestone.active .milestone-card.anchor-left,
      #days .scrub-lane.heck .milestone.active .milestone-card.anchor-right,
      #days .scrub-lane.trad .milestone.active .milestone-card.anchor-left,
      #days .scrub-lane.trad .milestone.active .milestone-card.anchor-right { transform: translate(0, 0); }
      #days .milestone.active .milestone-dot::after {
        content: ""; position: absolute; left: 50%; width: 1px; pointer-events: none;
      }
      #days .scrub-lane.heck .milestone.active .milestone-dot::after {
        top: 100%; height: 22px;
        background: linear-gradient(180deg, color-mix(in oklab, var(--accent) 60%, transparent), transparent);
      }
      #days .scrub-lane.trad .milestone.active .milestone-dot::after {
        bottom: 100%; height: 22px;
        background: linear-gradient(0deg, color-mix(in oklab, var(--danger) 60%, transparent), transparent);
      }
      #days .scrub-thumb-line {
        position: absolute; top: 60px; bottom: 12px; width: 1px;
        background: linear-gradient(180deg, color-mix(in oklab, white 18%, transparent), color-mix(in oklab, white 4%, transparent));
        pointer-events: none; z-index: 3;
      }
      #days .scrub-thumb {
        position: absolute; top: 60px;
        width: 22px; height: 22px; border-radius: 50%;
        background: var(--fg); border: 3px solid var(--bg);
        box-shadow: 0 0 0 1px var(--line), 0 8px 24px oklch(0 0 0 / 0.5);
        transform: translate(-50%, -50%); cursor: grab; z-index: 4;
        transition: transform .15s;
      }
      #days .scrub-thumb:hover { transform: translate(-50%, -50%) scale(1.1); }
      #days .scrub-thumb:active { cursor: grabbing; transform: translate(-50%, -50%) scale(1.05); }
      #days .scrub-thumb-flag {
        position: absolute; top: -28px; left: 50%; transform: translateX(-50%);
        padding: 3px 8px; border-radius: 4px;
        background: var(--fg); color: var(--bg);
        font-family: var(--font-mono); font-size: 10.5px; font-weight: 600; white-space: nowrap;
      }
      #days .receipt { position: relative; overflow: hidden; }
      #days .receipt::before {
        content: ""; position: absolute; inset: 0;
        background: radial-gradient(400px 200px at 100% 0%, var(--accent-glow), transparent 60%);
        opacity: 0.5; pointer-events: none;
      }
      #days .receipt-h {
        font-family: var(--font-mono); font-size: 10.5px;
        letter-spacing: 0.16em; text-transform: uppercase; color: var(--fg-3);
      }
      #days .receipt-big {
        font-family: var(--font-display); font-weight: 700;
        font-size: clamp(44px, 5vw, 64px); letter-spacing: -0.045em;
        line-height: 0.95; margin-top: 14px; color: var(--accent);
        text-shadow: 0 0 56px var(--accent-glow);
        font-variant-numeric: tabular-nums; position: relative;
      }
      #days .receipt-sub { color: var(--fg-2); font-size: 13px; margin-top: 12px; line-height: 1.5; }
      #days .receipt-grid {
        margin-top: 22px; display: grid; grid-template-columns: 1fr 1fr;
        gap: 14px; padding-top: 18px; border-top: 1px solid var(--line-soft);
      }
      #days .receipt-grid .lbl {
        font-family: var(--font-mono); font-size: 10px;
        letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3);
      }
      #days .receipt-grid .val {
        font-family: var(--font-display); font-weight: 600; font-size: 22px;
        letter-spacing: -0.02em; margin-top: 4px; font-variant-numeric: tabular-nums;
      }
      #days .trad-stamp {
        margin-top: 18px; padding: 14px 16px;
        border: 1px dashed color-mix(in oklab, var(--danger) 40%, transparent);
        border-radius: 8px;
        background: color-mix(in oklab, var(--danger) 4%, transparent);
      }
      #days .trad-stamp .lbl {
        font-family: var(--font-mono); font-size: 9.5px;
        letter-spacing: 0.16em; text-transform: uppercase;
        color: color-mix(in oklab, var(--danger) 90%, white 10%);
      }
      #days .trad-stamp .msg {
        font-family: var(--font-display); font-weight: 600;
        margin-top: 4px; font-size: 17px; letter-spacing: -0.015em;
      }
      #days .scrub-ctrls { display: flex; align-items: center; gap: 10px; }
      #days .scrub-btn {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 9px 14px; border-radius: 999px;
        border: 1px solid var(--line);
        font-family: var(--font-mono); font-size: 11px;
        letter-spacing: 0.08em; text-transform: uppercase;
        color: var(--fg);
        background: color-mix(in oklab, var(--bg-1) 80%, transparent);
      }
      #days .scrub-btn:hover { border-color: var(--fg-3); }
      #days .scrub-btn.primary { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
    `}</style>
  );
}
