import { useState, useMemo } from 'react';

export default function Calculator() {
  const [employees, setEmployees] = useState(8);
  const [salary, setSalary] = useState(72);
  const [opsHours, setOpsHours] = useState(14);
  const [automation, setAutomation] = useState(72);

  const calc = useMemo(() => {
    const hourlyCost = (salary * 1000) / 2080;
    const weeklyHoursReclaimed = employees * opsHours * (automation / 100);
    const annualHoursReclaimed = weeklyHoursReclaimed * 50;
    const annualLaborSavings = annualHoursReclaimed * hourlyCost;
    const annualAgentCost = Math.max(employees * 0.6, 4) * 12 * 1200;
    const netSavings = annualLaborSavings - annualAgentCost;
    const roi = (netSavings / annualAgentCost) * 100;
    const paybackMonths = annualAgentCost > 0 ? (annualAgentCost / (annualLaborSavings / 12)) : 0;
    return { hourlyCost, weeklyHoursReclaimed, annualHoursReclaimed, annualLaborSavings, annualAgentCost, netSavings, roi, paybackMonths };
  }, [employees, salary, opsHours, automation]);

  const fmt$ = (n) => '$' + Math.round(n).toLocaleString();
  const fmt$k = (n) => '$' + Math.round(n / 1000).toLocaleString() + 'k';

  return (
    <section id="calculator" className="section" style={{
      background: 'linear-gradient(180deg, transparent, var(--bg-1) 20%, var(--bg-1) 80%, transparent)',
    }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>05 — Cost of doing nothing</span>
          <h2>Drag four sliders.<br/><span style={{ color: 'var(--fg-3)' }}>See what your patience is costing you.</span></h2>
          <p className="lead">
            Conservative model. Fully-loaded labor cost. Includes oversight, infra, and Heck retainer. Excludes upside from quality and speed gains.
          </p>
        </div>

        <div className="calc-grid">
          <div className="card" style={{ padding: 36 }}>
            <Slider label="Team size" hint="People doing operations work"
              value={employees} min={1} max={50} step={1}
              onChange={setEmployees} suffix=" people" />
            <Slider label="Avg fully-loaded salary" hint="Salary + benefits, $K/year"
              value={salary} min={40} max={180} step={2}
              onChange={setSalary} prefix="$" suffix="k" />
            <Slider label="Hours/week on automatable ops" hint="Per person. Inbox, scheduling, invoices, reporting, etc."
              value={opsHours} min={2} max={40} step={1}
              onChange={setOpsHours} suffix=" hrs" />
            <Slider label="What's safely automatable" hint="We rarely go above 80%. Humans stay in the loop."
              value={automation} min={20} max={90} step={1}
              onChange={setAutomation} suffix="%" />

            <div style={{
              marginTop: 24, paddingTop: 22,
              borderTop: '1px solid var(--line-soft)',
              display: 'flex', gap: 16, flexWrap: 'wrap',
              fontSize: 13, color: 'var(--fg-3)',
            }}>
              <span className="mono">Hourly cost: {fmt$(calc.hourlyCost)}</span>
              <span className="mono">/  Weekly hrs reclaimed: {Math.round(calc.weeklyHoursReclaimed)}</span>
            </div>
          </div>

          <div className="card" style={{
            padding: 36, background: 'var(--bg)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Annual net savings
              </div>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(64px, 9vw, 124px)', letterSpacing: '-0.045em',
                lineHeight: 0.92, marginTop: 16,
                color: 'var(--accent)', textShadow: '0 0 60px var(--accent-glow)',
              }}>
                {fmt$k(calc.netSavings)}
              </div>
              <div style={{ marginTop: 12, color: 'var(--fg-2)' }}>
                ({fmt$(calc.annualLaborSavings)} reclaimed labor − {fmt$(calc.annualAgentCost)} Heck retainer)
              </div>

              <div style={{
                marginTop: 36,
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
                paddingTop: 24, borderTop: '1px solid var(--line-soft)',
              }}>
                <Stat label="ROI (year 1)" value={`${Math.round(calc.roi)}%`} />
                <Stat label="Payback period" value={`${calc.paybackMonths.toFixed(1)} mo`} />
                <Stat label="Hours reclaimed" value={`${Math.round(calc.annualHoursReclaimed).toLocaleString()}/yr`} />
              </div>

              <div style={{
                marginTop: 32, padding: '16px 18px',
                background: 'oklch(0.18 0.006 250)',
                border: '1px solid var(--line-soft)',
                borderRadius: 8, fontSize: 14, color: 'var(--fg-2)',
              }}>
                <span style={{ color: 'var(--accent)', fontWeight: 500 }}>What you're spending</span> by waiting another quarter:
                {' '}
                <span style={{ color: 'var(--fg)', fontWeight: 500 }}>{fmt$(calc.netSavings / 4)}</span>.
              </div>
            </div>

            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(circle at 80% 0%, var(--accent-glow), transparent 60%)',
              opacity: 0.4,
            }} />
          </div>
        </div>
      </div>

      <style>{`
        .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 980px) { .calc-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function Slider({ label, hint, value, min, max, step, onChange, prefix, suffix }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 32 }}>
      <div className="flex between" style={{ marginBottom: 4, alignItems: 'baseline' }}>
        <span style={{ fontWeight: 500, fontSize: 15 }}>{label}</span>
        <span className="mono" style={{ color: 'var(--accent)', fontSize: 14 }}>
          {prefix || ''}{value}{suffix || ''}
        </span>
      </div>
      <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 11.5, marginBottom: 14 }}>{hint}</div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          backgroundImage: `linear-gradient(var(--accent), var(--accent))`,
          backgroundSize: `${pct}% 100%`,
          backgroundRepeat: 'no-repeat',
        }}
        className="hh-range"
      />
      <style>{`
        .hh-range {
          -webkit-appearance: none; appearance: none;
          height: 4px; background: var(--line);
          border-radius: 2px; outline: none;
        }
        .hh-range::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--accent); cursor: pointer;
          box-shadow: 0 0 0 6px color-mix(in oklab, var(--accent) 18%, transparent);
          transition: box-shadow .15s;
        }
        .hh-range::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 10px color-mix(in oklab, var(--accent) 24%, transparent);
        }
        .hh-range::-moz-range-thumb {
          width: 18px; height: 18px; border: 0; border-radius: 50%;
          background: var(--accent); cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', marginTop: 6 }}>{value}</div>
    </div>
  );
}
