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
    name: 'Teardown',
    price: 'Free · 20 minutes',
    desc: 'A 20-minute call where we find the single most expensive repetitive task in your week and put a real annual dollar figure on it. You get a written one-page teardown within 24 hours — yours to keep whether or not we ever work together.',
    deliverables: ['One-page written teardown', 'Annual cost of the workflow', 'Plain-English agent spec', 'Honest go / no-go call'],
  },
  {
    n: '02',
    name: 'First Agent Sprint',
    price: '$1,950 · 10 business days',
    desc: 'One workflow, one agent, running in production on your real stack in ten business days — or you do not pay. Scope is fixed in writing before day one, so there is nothing to renegotiate later.',
    deliverables: ['Production agent, live', 'Fixed scope agreed up front', 'Runbook + handoff walkthrough', '30-day watch window', 'Live in 10 days or it is free'],
  },
  {
    n: '03',
    name: 'Operate',
    price: 'From $600 / month',
    desc: 'We own uptime, evals, and continuous improvement — one improvement shipped every month. You get a monthly brief and a Slack channel that is actually answered.',
    deliverables: ['24/7 monitoring', 'One improvement per month', 'Monthly written brief', 'On-call support'],
  },
];

// Kept available on request, deliberately not part of the main ladder.
export const ALSO_AVAILABLE = [
  'On-premise deployment on your own hardware',
  'Multi-model integration across your existing tools',
  'Content automation pipelines',
  'Full operations audit ($2,500 · 5 days)',
];

export const FAQS = [
  {
    q: 'How long until we see results?',
    a: 'Ten business days from kickoff to a working agent in production. That is the whole point of the sprint — if it is not live on day ten, you do not pay.',
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
    q: 'Who have you built this for already?',
    a: 'We are taking three founding clients at cost specifically to build local case studies with real numbers — which is exactly why the price is $1,950 with a money-back guarantee instead of five figures. You get our full attention at a price that will not exist once those case studies do.',
  },
  {
    q: 'Do you work with our stack?',
    a: 'If it has an API, a database, or even a half-decent web UI, yes. We’ve shipped against Salesforce, HubSpot, Shopify, Xero, Clio, Linear, Notion, and a 30-year-old AS/400.',
  },
  {
    q: 'How are you priced?',
    a: 'The teardown is free. The First Agent Sprint is a fixed $1,950 — half up front, half on go-live, and nothing at all if it is not live in ten business days. Operate is a flat monthly retainer from $600. No hourly billing, no surprise invoices, ever.',
  },
];
