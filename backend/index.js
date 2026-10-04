require('dotenv').config();

const express = require('express');
const cors = require('cors');

const submitForm = require('./src/controllers/SubmitForm.controller');
const rateLimit = require('./src/middleware/rateLimit');

const app = express();
const PORT = process.env.PORT || 4000;

app.disable('x-powered-by');

/*
 * Behind a proxy or serverless platform, `req.ip` is otherwise the proxy's
 * address — which would collapse every visitor into one shared rate-limit
 * bucket and 429 the whole internet.
 *
 * `1` trusts exactly one hop: the platform proxy, which overwrites
 * X-Forwarded-For. `true` would trust the entire chain and let a client spoof
 * its own IP to sidestep the rate limit, so avoid it unless every proxy in the
 * path is known to overwrite the header.
 */
app.set('trust proxy', 1);

const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = (process.env.ALLOWED_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  if (isProduction) {
    // Failing open would let any site on the internet make this server email
    // the owner on demand.
    throw new Error('ALLOWED_ORIGIN must be set in production.');
  }
  console.warn(
    '[cors] ALLOWED_ORIGIN is unset — allowing all origins. Set it before deploying.',
  );
}

const corsOptions = {
  origin(origin, callback) {
    // No Origin header means same-origin, curl, or a health check.
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    const error = new Error(`Origin ${origin} is not allowed`);
    error.status = 403;
    return callback(error);
  },
};

app.use(cors(corsOptions));

// Cap the payload before doing any work on it.
app.use(express.json({ limit: '16kb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Throttle before the handler so rejected payloads are cheap.
app.post('/submitForm', rateLimit(), submitForm);

// eslint-disable-next-line no-unused-vars -- Express identifies error handlers by arity.
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  console.error(`[error] ${status}:`, err.stack || err.message);
  res.status(status).json({ error: status === 403 ? 'Forbidden.' : 'Something went wrong.' });
});

/* Vercel imports this file directly; only listen when run locally. */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;