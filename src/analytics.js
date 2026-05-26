// PostHog wrapper. Loads + initializes if VITE_POSTHOG_KEY is set;
// otherwise turns every track() / identify() call into a safe no-op so the
// site keeps working in local dev or if the env var is missing in prod.

import posthog from 'posthog-js';

const KEY = import.meta.env.VITE_POSTHOG_KEY;
const HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

let ready = false;

export function initAnalytics() {
  if (!KEY) {
    if (import.meta.env.DEV) {
      console.info('[analytics] VITE_POSTHOG_KEY not set — events suppressed');
    }
    return;
  }
  if (ready) return;
  posthog.init(KEY, {
    api_host: HOST,
    person_profiles: 'identified_only', // only create profiles when we identify
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true, // capture clicks on important elements
    disable_session_recording: true, // can opt in later if needed
  });
  ready = true;
}

export function track(event, properties) {
  if (!ready) return;
  try {
    posthog.capture(event, properties);
  } catch (e) {
    console.warn('[analytics] track failed', e);
  }
}

export function identify(distinctId, traits) {
  if (!ready) return;
  try {
    posthog.identify(distinctId, traits);
  } catch (e) {
    console.warn('[analytics] identify failed', e);
  }
}
