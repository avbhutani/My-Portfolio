# Anubhav Bhutani — Portfolio

Personal portfolio website. A single-page React front end, plus an Express API that
forwards contact-form messages by email.

Visitors reach the author through **email or LinkedIn** links rather than an on-page
form. The form component is still in the tree but is not rendered — see
[Contact section](#contact-section).

- **Frontend** — React 18 + Vite, CSS Modules, dark/light theming
- **Backend** — Express, Nodemailer, deployed as a serverless function

---

## Quick start

Two terminals, one per package.

```bash
# Terminal 1 — API on http://localhost:4000
cd backend
npm install
cp .env.example .env      # then fill in ID_ACCESS_PASS
npm run dev

# Terminal 2 — site on http://localhost:3000
cd frontend
npm install
npm run dev
```

The front end falls back to the deployed API URL, so the contact form still works
without the local backend running.

---

## Editing content

**All portfolio content lives in [`frontend/src/data/content.js`](frontend/src/data/content.js).**
You should not need to touch a component to change a job, a school, or a link.

| To change…                          | Edit                                    |
| ----------------------------------- | --------------------------------------- |
| Name, role, bio, résumé link        | `profile`                               |
| Nav items                           | `navLinks`                              |
| GitHub / LinkedIn / email           | `socials`                               |
| Jobs                                | `experience`                            |
| Education                           | `education`                             |
| Achievements                        | `achievements`                          |

To **add a section**, append to the relevant array above, then add a matching entry to
`navLinks` and render it in `frontend/src/App.jsx` between `<Header />` and `<Footer />`.
Section spacing, headings, and scroll-spy active states come for free.

---

## Before publishing

Some values are intentionally left blank so nothing unverified goes live. Search the
repo for `TODO(owner)` — each one is a real task:

- [ ] **Experience highlights** — add 2–4 concrete bullets per role in
      `content.js`. These matter most to a hiring manager.
- [ ] **Experience tech stacks** — fill in the `tech` arrays.
- [ ] **Résumé** — the current link opens a Google Drive viewer page. Host a
      direct-download PDF instead and update `profile.resumeUrl`.
- [ ] **Contact email** — update `socials.email` if `avbhutani3@gmail.com` should change.
- [ ] **Canonical URL + origin** — `frontend/index.html` has no `<link rel="canonical">`.
      `frontend/public/sitemap.xml` and `robots.txt` are schema-valid but point at
      the RFC 2606 placeholder `example.com`; swap in the deployed front-end origin
      (the sitemap path is already correct).
- [ ] **OG image** — add a 1200×630 `og-image.png` to `frontend/public/` and
      uncomment the `og:image` meta tag.
- [ ] **`ALLOWED_ORIGIN`** — set it in the backend deployment env vars to the
      deployed front-end origin.

---

## Testing

```bash
cd frontend
npm run lint     # ESLint 9 flat config
npm test         # Vitest + Testing Library
npm run build    # production build to dist/
```

The suite covers content integrity, nav/section wiring, theme toggling, the
contact form's validation, submit, and failure paths, and Back/Forward hash sync.

---

## Contact section

`components/ContactLinks` is what the site renders. It offers two channels —
`mailto:` and the LinkedIn profile — as whole-card links. Both come from
`socials` in `content.js`, so changing an address or a profile URL is a
one-line edit and needs no component change.

The original form still exists at `components/Contact/Contact` and is **not
imported by `App`**. To bring it back:

1. In `App.jsx`, swap the `ContactLinks` import for `Contact`.
2. Swap `<ContactLinks />` for `<Contact />`.

`<ToastContainer>` is still mounted in `App` for exactly this reason — the form
needs a toast host, and without it every success and failure message would
silently vanish.

Until then the API's `/submitForm` endpoint has no caller. The backend stays
deployed and unchanged, so re-enabling the form is purely a front-end change.

---

## Section links, history, and deep links

Nav clicks push a history entry, so `useHashNavigation` has to move the
viewport back in step:

- **Back / Forward** re-scrolls to the section for the restored fragment. This
  matters most on phones, where the back gesture is habitual.
- **A cold load onto `#contact`** re-scrolls past the sticky header. The
  browser's own fragment jump ignores the header and would otherwise park the
  heading underneath it.
- **An empty fragment** means the top of the page, but only on a real history
  step — the initial sync leaves the position alone so a refresh does not jump.

`utils/scroll.js` also owns the mobile menu's scroll behaviour: the panel is
absolutely positioned so opening it cannot change the document height, which
would otherwise drag the scroll position and move the section you just
navigated to.

---

## Deployment

**Backend** — the included `vercel.json` deploys as a serverless function. Add
`ID_ACCESS_PASS`, `MAIL_USER`, `MAIL_TO`, and `ALLOWED_ORIGIN` as environment
variables in the Vercel project.

**Frontend** — any static host works; the build output is `dist/`. Set
`VITE_API_BASE_URL` at build time to point at the deployed API:

```bash
VITE_API_BASE_URL=https://your-api.vercel.app npm run build
```

`frontend/vercel.json` pins the Vite preset and `dist/` as the output directory.
This matters when redeploying a project created before the CRA → Vite migration:
Vercel keeps the framework preset from the original project, so it looks for
`build/` and fails with *"No Output Directory named \"build\" found"*. Either the
committed `vercel.json` or a Framework Preset of **Vite** in Project Settings →
Build & Deployment resolves it.

---

## Notes on the redesign

The previous version was a Create React App build. Notable changes beyond the visual
redesign:

- Migrated from deprecated `react-scripts` to Vite, and dropped Bootstrap (loaded
  twice — CDN *and* npm), `react-router-dom`, `react-bootstrap`, and `react-collapsed`,
  none of which were used.
- Fixed a nav bug where the Experience and Education icons scrolled to each
  other's sections, and a link to a section that had been commented out.
- The contact form used to `console.log` failures, leaving the user staring at a
  spinner. It now validates inline, shows success and error toasts, and preserves
  input on failure.
- The backend used to `throw` inside an email callback, which crashed the process
  and dropped every other in-flight request. It now validates input, honours a
  honeypot field, rate-limits, and scopes CORS to your front-end origin.
- Accessibility: skip link, landmark regions, labelled sections, a single `h1`,
  visible focus rings, and full `prefers-reduced-motion` support.