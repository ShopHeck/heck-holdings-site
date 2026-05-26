import { Component } from 'react';

// Class component because React 18 still has no hook equivalent for
// componentDidCatch. Wraps the whole tree so a crash in one section
// doesn't blank the entire page.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Surface in the console for debugging; in production we could ship
    // these to Sentry/Cloudflare logs, but keeping it dependency-free.
    console.error('Site crashed:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        textAlign: 'center',
        gap: 24,
      }}>
        <span className="eyebrow"><span className="dot"></span>error</span>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 700,
          letterSpacing: '-0.035em',
          maxWidth: 640,
        }}>
          Something here broke<span style={{ color: 'var(--accent)' }}>.</span>
        </h1>
        <p style={{ color: 'var(--fg-2)', maxWidth: 520, fontSize: 17, lineHeight: 1.5 }}>
          That's on us. Reload the page, or email{' '}
          <a href="mailto:hello@heckholdings.com" style={{ color: 'var(--accent)' }}>
            hello@heckholdings.com
          </a>{' '}
          and we'll get back to you within the hour.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </main>
    );
  }
}
