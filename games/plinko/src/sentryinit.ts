import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://927225a54467e655207a0a9f044237e7@o4508279367270400.ingest.de.sentry.io/4508459760812112',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
    /*Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),*/
  ],
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  // tracePropagationTargets: ['localhost', /^https:\/\/game-client\.apis\.tech/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [import.meta.env.VITE_SERVER_API, /^\/api\//],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
})
