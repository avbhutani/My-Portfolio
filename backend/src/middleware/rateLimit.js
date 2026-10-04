/**
 * Minimal fixed-window rate limiter held in memory.
 *
 * Good enough for a single-instance contact form. A serverless deployment gets
 * a fresh module per cold start, so treat this as a deterrent rather than a
 * hard guarantee.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const buckets = new Map();

function prune(now) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function rateLimit({ windowMs = WINDOW_MS, max = MAX_REQUESTS } = {}) {
  return function rateLimiter(req, res, next) {
    const now = Date.now();
    prune(now);

    // `prune()` above already removed every expired bucket, so anything still
    // in the map is inside its window.
    const key = req.ip || 'unknown';
    const bucket = buckets.get(key) ?? { count: 0, resetAt: now + windowMs };

    bucket.count += 1;
    buckets.set(key, bucket);

    if (bucket.count > max) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      res.set('Retry-After', String(retryAfter));
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    return next();
  };
}

module.exports = rateLimit;