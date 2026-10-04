# Portfolio — frontend

React 18 + Vite. Single page, no router — sections are anchored and the header
uses scroll-spy to track the active one.

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint      # ESLint 9 (flat config)
npm test          # Vitest, single run
npm run test:watch
npm run build     # -> dist/
npm run preview   # serve the production build locally
```

## Layout

```
src/
├── main.jsx                  entry
├── App.jsx                   section order + <main>
├── data/content.js           ALL portfolio content — edit this first
├── hooks/
│   ├── useTheme.js           dark/light, persisted, follows the OS by default
│   ├── useActiveSection.js   scroll-spy for the header nav
│   ├── useReveal.js          one shared IntersectionObserver for fade-ins
│   └── usePrefersReducedMotion.js
├── utils/                    scroll helpers, motion query
├── styles/
│   ├── tokens.css            design tokens: colour, type, spacing, motion
│   ├── global.css            reset, layout utilities, button/card primitives
│   └── toast.css             react-toastify themed with the tokens
└── components/
    ├── Header/  Hero/  About/  Experience/  Education/
    ├── Achievements/  Contact/  Footer/
    ├── ThemeToggle/  SectionHead/  Reveal/
    └── icons/                Icons.jsx (components) + registry.js (key → component)
```

## Conventions

- **Theming** — never hardcode a colour. Use a token from `tokens.css`. To rebrand the
  whole site, change `--accent` and the surface/text ramps; every component follows.
- **Styling** — CSS Modules per component, plus global classes for primitives that
  genuinely repeat (`.btn`, `.btnPrimary`, `.card`, `.pill`, `.sectionHead`).
- **Adding an icon** — add the component to `icons/Icons.jsx`, then register it in
  `icons/registry.js` if it is driven by a data key. `Icons.jsx` must only export
  components or React Fast Refresh breaks.
- **Content** — no copy lives in components. If you find yourself adding a string to
  a `.jsx` file, it probably belongs in `data/content.js`.

## Env vars

| Variable             | Purpose                                    | Default                              |
| -------------------- | ------------------------------------------ | ------------------------------------ |
| `VITE_API_BASE_URL`  | Base URL of the contact-form API           | `https://my-portfolio-ouo6.vercel.app` |

Create a `.env.local` (git-ignored) to override locally.