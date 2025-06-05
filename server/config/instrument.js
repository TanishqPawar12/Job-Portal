// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://e10b0257b886fc5f9a376f0c87a1621c@o4509446027018240.ingest.us.sentry.io/4509446033965056",
  integrations: [
    Sentry.mongooseIntegration(),
  ],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});