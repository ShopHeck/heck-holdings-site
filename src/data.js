// Static content used across sections.

export const CAPABILITIES = [
  {
    icon: 'inbox',
    title: 'Inbox triage & response',
    body: 'Agents read every email, classify urgency, draft replies in your voice, and only escalate the 5% that actually need a human.',
    metric: '94% auto-handled',
    code: ['gmail.poll()', '→ classify()', '→ draft.reply()', '→ slack.notify()'],
  },
  {
    icon: 'doc',
    title: 'Document & proposal generation',
    body: 'Pull live data from your CRM, generate a tailored proposal, run it through QA, and deliver as a branded PDF in under 90 seconds.',
    metric: '4 hr → 90 sec',
    code: ['crm.fetch(deal)', '→ llm.draft()', '→ qa.review()', '→ pdf.brand()'],
  },
  {
    icon: 'cart',
    title: 'Order & invoice processing',
    body: 'Watch the inbox, extract line items, reconcile with Shopify, post to Xero, and flag exceptions before they become returns.',
    metric: '0 manual entry',
    code: ['inbox.watch()', '→ ocr.extract()', '→ xero.post()'],
  },
  {
    icon: 'phone',
    title: 'Voice agents & scheduling',
    body: 'Answer after-hours calls, qualify leads, book onto your calendar, and send a follow-up SMS — all before you wake up.',
    metric: '24/7 coverage',
    code: ['twilio.answer()', '→ qualify()', '→ cal.book()'],
  },
  {
    icon: 'chart',
    title: 'Reporting & insights',
    body: 'Every Monday at 7am, a fresh executive brief lands in Slack: what moved, what broke, what to do next. Written, not dashboarded.',
    metric: 'Briefs, not dashboards',
    code: ['cron(mon 7am)', '→ pull.metrics()', '→ summarize()'],
  },
  {
    icon: 'eye',
    title: 'Competitive monitoring',
    body: 'Agents watch your competitors’ prices, launches, hires, and reviews — and ping you the moment something matters.',
    metric: 'Real-time alerts',
    code: ['scrape.daily()', '→ diff()', '→ slack.alert()'],
  },
];

export const AGENT_LOG = [
  { agent: 'mailroom', msg: 'Classifying inbound email from sarah@acme.co' },
  { agent: 'mailroom', msg: 'Intent: refund-request · priority: P1' },
  { agent: 'mailroom', msg: 'Drafted reply (tone: warm-formal, length: 78w)' },
  { agent: 'orchestrator', msg: '→ handoff to billing-agent' },
  { agent: 'billing', msg: 'Looking up order #A-83291 in Shopify' },
  { agent: 'billing', msg: 'Refund eligible · amount: $148.00 · issuing' },
  { agent: 'billing', msg: 'stripe.refunds.create() → re_1Q… ok' },
  { agent: 'orchestrator', msg: 'Posting summary to #ops-resolutions' },
  { agent: 'orchestrator', msg: 'Resolved in 11.3s · cost $0.04' },
  { agent: 'scout', msg: 'New competitor price drop detected: -12%' },
  { agent: 'scout', msg: 'Drafting brief for founder@heckholdings.com' },
  { agent: 'scheduler', msg: 'Booked 30min w/ J. Patel → Thu 2:00pm CT' },
];

export const PROJECTS = [
  {
    id: 'mailroom',
    name: 'Mailroom',
    client: 'Built for: email-heavy service firms',
    tag: 'Email automation',
    summary: 'An autonomous intake agent that reads every email, opens matters in your case or CRM system, drafts boilerplate replies, and routes the rest to the right person.',
    metrics: [
      { v: 'inbox', l: 'triaged end-to-end' },
      { v: '<2 min', l: 'target response time' },
      { v: 'top 5%', l: 'escalated to a human' },
    ],
    stack: ['Gmail API', 'Claude', 'Clio', 'Slack', 'Postgres'],
    color: 'oklch(0.78 0.16 145)',
  },
  {
    id: 'frontdesk',
    name: 'FrontDesk Voice',
    client: 'Built for: multi-location bookings',
    tag: 'Voice agent',
    summary: 'After-hours voice agent that handles bookings, FAQs, and intake screening across every location — fluent in English and Spanish.',
    metrics: [
      { v: '24/7', l: 'after-hours coverage' },
      { v: 'bilingual', l: 'English + Spanish' },
      { v: 'seconds', l: 'to answer & book' },
    ],
    stack: ['Twilio', 'ElevenLabs', 'OpenAI Realtime', 'Cal.com'],
    color: 'oklch(0.78 0.16 60)',
  },
  {
    id: 'proposalforge',
    name: 'ProposalForge',
    client: 'Built for: field-service & trades',
    tag: 'Document generation',
    summary: 'Feed it job-site photos and a customer brief. Out comes a fully-priced, branded, signature-ready proposal in about 90 seconds.',
    metrics: [
      { v: '~90 sec', l: 'photos to proposal' },
      { v: 'branded', l: 'signature-ready PDF' },
      { v: 'QA pass', l: 'before it ships' },
    ],
    stack: ['Vision API', 'HubSpot', 'DocuSign', 'PDF-lib'],
    color: 'oklch(0.78 0.16 250)',
  },
  {
    id: 'scout',
    name: 'Scout',
    client: 'Built for: DTC & competitive markets',
    tag: 'Competitive intelligence',
    summary: 'Watches your competitors’ sites, ad libraries, and review pages around the clock. Drops a one-page Monday brief on what changed and what to do about it.',
    metrics: [
      { v: 'daily', l: 'competitor sweeps' },
      { v: 'alerts', l: 'the moment it matters' },
      { v: '1 page', l: 'weekly brief' },
    ],
    stack: ['Playwright', 'Claude', 'Vector DB', 'Notion'],
    color: 'oklch(0.78 0.16 320)',
  },
  {
    id: 'reconcile',
    name: 'Reconcile',
    client: 'Built for: e-commerce & finance ops',
    tag: 'Bookkeeping ops',
    summary: 'Parses every invoice, receipt, and bank line. Reconciles to Xero. Flags variances so month-end closes faster, with a human only on the exceptions.',
    metrics: [
      { v: 'faster', l: 'month-end close' },
      { v: '0', l: 'manual entries' },
      { v: 'flagged', l: 'variances for review' },
    ],
    stack: ['Mindee OCR', 'Xero API', 'Plaid', 'Claude'],
    color: 'oklch(0.78 0.16 30)',
  },
  {
    id: 'briefroom',
    name: 'Briefroom',
    client: 'Built for: agencies & knowledge teams',
    tag: 'Knowledge ops',
    summary: 'Every client meeting transcribed, summarized, tagged, and indexed. Ask "what did we promise Acme on the Q3 launch?" — get an answer with timestamps.',
    metrics: [
      { v: 'every', l: 'meeting indexed' },
      { v: 'seconds', l: 'to find any answer' },
      { v: '0 hrs', l: 'recap writing' },
    ],
    stack: ['Whisper', 'Claude', 'Pinecone', 'Linear'],
    color: 'oklch(0.78 0.16 180)',
  },
];

export const SERVICES = [
  {
    n: '01',
    name: 'Audit',
    price: '$2,500 · 5 business days',
    desc: 'We shadow your team for five days, map every workflow, and deliver a ranked list of automations with ROI math you can take to your board.',
    deliverables: ['Workflow map', 'Agent opportunity scorecard', 'ROI projection', 'Implementation plan', 'Risk register', 'Integration architecture'],
  },
  {
    n: '02',
    name: 'Build',
    price: 'Per-agent · 2–6 weeks',
    desc: 'We design, build, and ship a production agent on your stack. You watch us work in a shared Linear board, in real time.',
    deliverables: ['Production agent', 'Eval harness', 'Observability dashboard', 'Runbook'],
  },
  {
    n: '03',
    name: 'Deploy',
    price: 'From $5,850 · 2–4 weeks',
    desc: 'We install Hermes Agent on your hardware — or buy the hardware for you. A fully autonomous AI employee running 24/7 on-premise.',
    deliverables: ['GPU workstation (optional)', 'Hermes Agent configured', 'Custom automations', 'Training & runbook'],
  },
  {
    n: '04',
    name: 'Integrate',
    price: 'From $2,500 · 1–3 weeks',
    desc: 'We connect ChatGPT, Claude, and Gemini to your CRM, email, calendar, and business tools — AI does real work inside your existing workflows.',
    deliverables: ['Multi-model AI setup', 'Up to 10 tool connections', 'Custom workflows', 'Error handling & monitoring'],
  },
  {
    n: '05',
    name: 'Automate Content',
    price: 'From $1,500 · 1–2 weeks',
    desc: 'AI finds trends in your niche, creates draft content in your voice, and queues it for approval. One tap to publish or schedule.',
    deliverables: ['Trend monitoring', '30–50 drafts/mo', 'One-tap approve', 'Auto-publish to all platforms'],
  },
  {
    n: '06',
    name: 'Operate',
    price: 'Monthly retainer',
    desc: 'We own uptime, evals, and continuous improvement. You get a monthly brief and a Slack channel that’s actually answered.',
    deliverables: ['24/7 monitoring', 'Monthly improvements', 'Weekly briefs', 'On-call support'],
  },
];

export const FAQS = [
  {
    q: 'How long until we see results?',
    a: 'First production agent in 3–6 weeks. Most clients hit ROI break-even inside the first 60 days — usually because the agent eliminates a job we didn’t even bill them to identify.',
  },
  {
    q: 'Will agents replace my team?',
    a: 'No. They’ll replace the worst hour of every team member’s day. Your people stop doing inbox triage and start doing the work you actually hired them for.',
  },
  {
    q: 'What if it breaks?',
    a: 'Every agent ships with an eval harness, full observability, and a graceful-degradation path back to a human queue. We’re on Slack — and on the hook.',
  },
  {
    q: 'Do you work with our stack?',
    a: 'If it has an API, a database, or even a half-decent web UI, yes. We’ve shipped against Salesforce, HubSpot, Shopify, Xero, Clio, Linear, Notion, and a 30-year-old AS/400.',
  },
  {
    q: 'How are you priced?',
    a: 'Audits are a fixed fee. Builds are scoped per agent before work starts. Operate is a flat monthly retainer. No hourly billing, no surprise invoices, ever.',
  },
];
