const PRODUCTS = [
  {
    tag: 'iOS app', color: 'var(--accent)', name: 'Fight Camp Training',
    meta: 'Live on the App Store · launched July 2026',
    body: 'A training-camp app for combat-sports athletes and coaches. Plan camps, log sessions, and track progress to fight night. Plans: Fighter Pro and Coach Pro.',
    href: 'https://apps.apple.com/us/app/fight-camp-training/id6767876080', cta: 'View on the App Store',
  },
  {
    tag: 'Platform', color: '#7dd3fc', name: 'Athlete Sponsorship Portal',
    meta: 'In development · first athlete live',
    body: 'A 360-degree athlete sponsorship platform that connects fighters with sponsors. Our first athlete filled every sponsor spot at +53% profit vs. his previous fight.',
    href: 'https://athletes.michaelheckert.com', cta: 'Visit the portal',
  },
  {
    tag: 'Shopify app', color: '#a7f3d0', name: 'Coordinate Studio',
    meta: 'Shopify App Store · launched Sept 2026',
    body: 'Lets Shopify merchants add location personalization to products and generate engraving-ready SVGs automatically.',
    href: 'https://apps.shopify.com/coordinate-studio', cta: 'View on Shopify',
  },
  {
    tag: 'Resource', color: '#fcd34d', name: 'AI Gigs & Opportunities',
    meta: 'ai.heckholdings.com',
    body: 'A curated page of AI training gigs and AI data opportunities. Includes referral links.',
    href: 'https://ai.heckholdings.com', cta: 'Browse opportunities',
  },
];

export default function Products() {
  return (
    <section id="products" className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Products</span>
          <h2>Software we build and run<br/><span style={{ color: 'var(--fg-3)' }}>— shipped, live, and in use.</span></h2>
          <p className="lead">
            Heck Holdings is a product company. Our software is built and operated by Shop Heck LLC, our operating company.
          </p>
        </div>
        <div className="prod-grid">
          {PRODUCTS.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noreferrer" className="card prod-card">
              <span className="chip" style={{ borderColor: p.color, color: p.color, alignSelf: 'flex-start' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.color }} />
                {p.tag}
              </span>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginTop: 16 }}>{p.name}</h3>
              <p className="mono" style={{ color: 'var(--fg-3)', marginTop: 4, fontSize: 11 }}>{p.meta}</p>
              <p style={{ color: 'var(--fg-2)', marginTop: 14, fontSize: 14, lineHeight: 1.5, flex: 1 }}>{p.body}</p>
              <span className="mono" style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line-soft)', fontSize: 12, color: 'var(--fg)' }}>{p.cta} →</span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .prod-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        @media (max-width: 1180px) { .prod-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 680px) { .prod-grid { grid-template-columns: 1fr; } }
        .prod-card { padding: 24px; display: flex; flex-direction: column; text-decoration: none; color: inherit; transition: transform .25s ease, border-color .25s ease; }
        .prod-card:hover { transform: translateY(-3px); }
      `}</style>
    </section>
  );
}
