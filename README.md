# CodeSolve

A modern, responsive, single-page website for a coding problem solving service. Visitors can see what is offered, check the pricing, and contact the owner directly on WhatsApp.

Built with **React** and **Vite**. No UI library, no icon library, no CSS framework: everything lives in one component file, which keeps the site fast and lightweight.

## Features

- Responsive layout for mobile and desktop, with a hamburger menu on small screens
- Sections: Hero, Service, Platforms, Pricing, How It Works, Contact and Footer
- Every WhatsApp button opens a chat with a pre-filled message
- Floating WhatsApp button, visible on all screen sizes
- Price, WhatsApp number and message are each defined in one place
- Scroll-triggered animation on the "How It Works" cards
- Respects the visitor's reduced-motion setting
- Keyboard-friendly, with visible focus outlines

## Tech stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- Google Fonts (Bricolage Grotesque, Instrument Sans, JetBrains Mono), loaded from the Google Fonts CDN

## Getting started

Requires [Node.js](https://nodejs.org/) 18 or newer.

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/codesolve.git
cd codesolve

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## Configuration

All editable settings are at the top of `src/App.jsx`:

```js
const BRAND_NAME = "CodeSolve";
const PRICE_PER_UNIT = 100; // 1 unit = 1 coding problem
const CURRENCY_SYMBOL = "₹";
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // country code + number, digits only
const WHATSAPP_MESSAGE = "Hi, I want to get a coding problem solved.";
```

| Setting | What it controls |
| --- | --- |
| `BRAND_NAME` | Name shown in the navbar, footer and copyright line |
| `PRICE_PER_UNIT` | The price shown in the pricing card |
| `CURRENCY_SYMBOL` | Currency symbol shown before the price |
| `WHATSAPP_NUMBER` | Number used by every WhatsApp link and shown in the footer |
| `WHATSAPP_MESSAGE` | Message pre-filled when a visitor opens WhatsApp |

**Before you deploy, replace `91XXXXXXXXXX` with your real WhatsApp number.**

The number is written as country code followed by the number, with no `+`, spaces or dashes (for example `919876543210`). The footer display (`+91 98765 43210` style) is generated from this value and assumes a 2-digit country code.

## Project structure

```
codesolve/
├── public/            Static assets (favicon, etc.)
├── src/
│   ├── App.jsx        The whole website: config, components and styles
│   └── main.jsx       React entry point
├── index.html
├── package.json
└── vite.config.js
```

## Customising

- **Text and sections:** edit the components in `src/App.jsx` (`Hero`, `Service`, `Platforms`, `Pricing`, `HowItWorks`, `Contact`, `Footer`).
- **Service list, platforms, steps:** edit the `SERVICE_ITEMS`, `PLATFORMS`, `PRICE_FEATURES` and `STEPS` arrays near the top of the file.
- **Colours and fonts:** change the CSS variables in the `:root` block inside the `styles` string at the bottom of `App.jsx`.
- **Nav links:** edit the `NAV_LINKS` array.

## Build for production

```bash
npm run build
```

This creates a `dist/` folder with the production files. To preview it locally:

```bash
npm run preview
```

## Deployment

The easiest way is to connect the GitHub repository to a static hosting service:

- **Vercel:** Import the repo, keep the defaults (Vite is detected automatically), and click Deploy.
- **Netlify:** Import the repo, set the build command to `npm run build` and the publish directory to `dist`, then deploy.

Every `git push` to `main` will redeploy the site automatically.

## Disclaimer

CodeSolve is an independent service. It is not affiliated with, endorsed by, or sponsored by CodeTantra, NeoColab, or any other platform mentioned on the site. Platform names are used only to describe which problems are supported.

## License

All rights reserved. Add a license of your choice here if you want others to reuse the code.
