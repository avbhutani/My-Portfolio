const nodemailer = require('nodemailer');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  name: 100,
  email: 254, // RFC 5321 practical limit
  content: 4000,
};

/** Returns a field -> message map; empty object means the payload is valid. */
function validate({ name, email, content }) {
  const errors = {};

  if (typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.trim().length > LIMITS.name) {
    errors.name = `Name must be under ${LIMITS.name} characters.`;
  }

  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'A valid email address is required.';
  } else if (email.trim().length > LIMITS.email) {
    errors.email = 'Email address is too long.';
  }

  if (typeof content !== 'string' || content.trim().length < 10) {
    errors.content = 'Message must be at least 10 characters.';
  } else if (content.trim().length > LIMITS.content) {
    errors.content = `Message must be under ${LIMITS.content} characters.`;
  }

  return errors;
}

/** Build the transport lazily so a missing password fails at request time, not boot. */
let transporter;
function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.ID_ACCESS_PASS,
    },
  });

  return transporter;
}

/** Strip characters that could be used to inject extra mail headers. */
const sanitizeHeaderValue = (value) => String(value).replace(/[\r\n]+/g, ' ').trim();

async function submitForm(req, res, next) {
  try {
    // Honeypot: the frontend leaves `company` empty for humans, so anything in
    // it means a bot. Report success so bots do not adapt.
    if (typeof req.body?.company === 'string' && req.body.company.trim()) {
      return res.status(200).json({ success: true });
    }

    const errors = validate(req.body ?? {});
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: 'Validation failed.', fields: errors });
    }

    const name = sanitizeHeaderValue(req.body.name);
    const email = sanitizeHeaderValue(req.body.email);
    const content = req.body.content.trim();

    const mail = {
      from: `"Portfolio contact form" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: [
        'New message from the portfolio contact form',
        '',
        `Name:    ${name}`,
        `Email:   ${email}`,
        '',
        content,
      ].join('\n'),
    };

    await getTransporter().sendMail(mail);

    return res.status(200).json({ success: true });
  } catch (error) {
    // Log and delegate — an unhandled throw inside a callback would kill the
    // process, taking every other in-flight request with it.
    return next(error);
  }
}

module.exports = submitForm;