import { useId, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { profile, socials } from '../../data/content';
import Reveal from '../Reveal/Reveal';
import SectionHead from '../SectionHead/SectionHead';
import { IconAlert, IconMail, IconSend } from '../icons/Icons';
import { socialIcons } from '../icons/registry';
import s from './Contact.module.css';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://my-portfolio-ouo6.vercel.app';

const EMPTY = { name: '', email: '', message: '', company: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Please write a message of at least 10 characters.';
  }

  return errors;
}

export default function Contact() {
  const formId = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear a field's error as soon as the user starts fixing it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const fieldErrors = validate(values);
    if (fieldErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === 'submitting') return;

    // Honeypot: a real user never sees this field, so anything in it is a bot.
    if (values.company) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.warn('Please fix the highlighted fields.');
      return;
    }

    setStatus('submitting');

    try {
      await axios.post(`${API_BASE_URL}/submitForm`, {
        name: values.name.trim(),
        email: values.email.trim(),
        content: values.message.trim(),
      });

      setValues(EMPTY);
      setErrors({});
      toast.success('Message sent — I’ll get back to you soon.');
    } catch (error) {
      const statusCode = error?.response?.status;
      const message =
        statusCode === 429
          ? 'Too many messages from this address. Please try again later.'
          : 'Something went wrong and the message was not sent. Please email me directly instead.';
      toast.error(message, { autoClose: 7000 });
    } finally {
      setStatus('idle');
    }
  };

  const socialEntries = ['github', 'linkedin', 'x'].filter((key) => socials[key]);
  const submitting = status === 'submitting';

  const fieldProps = (name) => ({
    id: `${formId}-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${formId}-${name}-error` : undefined,
    className: name === 'message' ? s.textarea : s.input,
  });

  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <SectionHead
          id="contact"
          eyebrow="Contact"
          title="Let’s work together"
          subtitle="Have a role, a project, or a hard backend problem in mind? Send a note and I’ll reply within a day or two."
        />

        <div className={s.layout}>
          <Reveal className={s.aside}>
            <div className={s.direct}>
              <span className={s.directLabel}>Email</span>
              <a className={s.directLink} href={`mailto:${socials.email}`}>
                <IconMail size={19} aria-hidden="true" />
                {socials.email}
              </a>
            </div>

            {socialEntries.length > 0 && (
              <div className={s.social}>
                {socialEntries.map((key) => {
                  const Icon = socialIcons[key];
                  return (
                    <a
                      key={key}
                      className={s.socialLink}
                      href={socials[key]}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Icon size={16} />
                      {key}
                    </a>
                  );
                })}
              </div>
            )}

            <p className={s.asideNote}>
              I&rsquo;m currently working as a {profile.role} and open to interesting
              backend and platform problems. If the form above is down, email works
              just as well.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <form className={s.form} onSubmit={handleSubmit} noValidate>
              <div className={s.row}>
                <div className={s.field}>
                  <label className={s.label} htmlFor={`${formId}-name`}>
                    Name
                  </label>
                  <input
                    {...fieldProps('name')}
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    disabled={submitting}
                  />
                  {errors.name && (
                    <p className={s.error} id={`${formId}-name-error`}>
                      <IconAlert size={15} />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className={s.field}>
                  <label className={s.label} htmlFor={`${formId}-email`}>
                    Email
                  </label>
                  <input
                    {...fieldProps('email')}
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    disabled={submitting}
                  />
                  {errors.email && (
                    <p className={s.error} id={`${formId}-email-error`}>
                      <IconAlert size={15} />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className={s.field}>
                <label className={s.label} htmlFor={`${formId}-message`}>
                  Message
                </label>
                <textarea
                  {...fieldProps('message')}
                  rows={6}
                  placeholder="Tell me a bit about the role or project…"
                  disabled={submitting}
                />
                {errors.message && (
                  <p className={s.error} id={`${formId}-message-error`}>
                    <IconAlert size={15} />
                    {errors.message}
                  </p>
                )}
              </div>

              <div className={s.honeypot} aria-hidden="true">
                <label htmlFor={`${formId}-company`}>Company (leave this empty)</label>
                <input
                  id={`${formId}-company`}
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={handleChange}
                />
              </div>

              <div className={s.footer}>
                <p className={s.hint}>
                  I read every message. No newsletters, no spam — ever.
                </p>
                <button className="btn btnPrimary" type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className={s.spinner} aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <IconSend size={17} />
                      Send message
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}