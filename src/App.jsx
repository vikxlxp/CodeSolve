import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   CONFIG — edit these values; everything on the page updates automatically.
   ========================================================================== */
const BRAND_NAME = "CodeSolve";
const PRICE_PER_UNIT = 100; // 1 unit = 1 coding problem
const CURRENCY_SYMBOL = "₹";
const WHATSAPP_NUMBER = "918580407681"; // country code + number, digits only
const WHATSAPP_MESSAGE = "Hi, I want to get a coding problem solved.";

/* Derived values (no need to edit) */
const PRICE_TEXT = `${"₹"}${100}`;
const whatsappUrl = `https://wa.me/${+918580407681}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
// Assumes a 2-digit country code (91 for India): "91XXXXXXXXXX" -> "+91 XXXXXXXXXX"
const whatsappDisplay = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2)}`;

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Service", href: "#service" },
  { label: "Pricing", href: "#pricing" },
  { label: "Platforms", href: "#platforms" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_ITEMS = [
  {
    title: "Coding problem solving",
    text: "Send a coding problem and get it solved.",
    icon: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />,
  },
  {
    title: "Working code",
    text: "Complete code written for the problem you send.",
    icon: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  },
  {
    title: "Simple explanation",
    text: "A plain-language walkthrough so you can follow the solution.",
    icon: <path d="M4 6h16M4 12h16M4 18h10" />,
  },
  {
    title: "Problem-specific guidance",
    text: "Help that stays focused on the exact problem you submitted.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
  },
];

const PLATFORMS = [
  {
    name: "CodeTantra",
    text: "Get your CodeTantra coding problems solved.",
    icon: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  },
  {
    name: "NeoColab",
    text: "Get your NeoColab coding problems solved.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m7 9 3 3-3 3M13 15h4" />
      </>
    ),
  },
];

const PRICE_FEATURES = [
  "Code solution",
  "Simple explanation",
  "Support for the submitted problem",
];

const STEPS = [
  { n: "01", title: "Send Problem", text: "Send your coding problem through WhatsApp." },
  { n: "02", title: "Get Solution", text: "I solve the submitted coding problem." },
  { n: "03", title: "Receive Solution", text: "You receive the solution and explanation." },
];

/* Sample shown in the hero editor panel */
const SAMPLE_LINES = [
  { indent: 0, node: <span className="cs-c"># Count the vowels in a word</span> },
  {
    indent: 0,
    node: (
      <>
        <span className="cs-k">def</span> <span className="cs-f">count_vowels</span>(word):
      </>
    ),
  },
  { indent: 1, node: <>total = <span className="cs-n">0</span></> },
  {
    indent: 1,
    node: (
      <>
        <span className="cs-k">for</span> ch <span className="cs-k">in</span> word.lower():
      </>
    ),
  },
  {
    indent: 2,
    node: (
      <>
        <span className="cs-k">if</span> ch <span className="cs-k">in</span>{" "}
        <span className="cs-s">"aeiou"</span>:
      </>
    ),
  },
  { indent: 3, node: <>total += <span className="cs-n">1</span></> },
  { indent: 1, node: <><span className="cs-k">return</span> total</> },
  { indent: 0, node: null },
  {
    indent: 0,
    node: (
      <>
        <span className="cs-f">print</span>(<span className="cs-f">count_vowels</span>(
        <span className="cs-s">"CodeSolve"</span>))
      </>
    ),
  },
  { indent: 0, node: <span className="cs-c"># Output: 4</span> },
];

/* ==========================================================================
   Icons (inline SVG — no icon library needed)
   ========================================================================== */
function WhatsAppIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function StrokeIcon({ children, size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const CheckIcon = () => (
  <StrokeIcon size={14}>
    <path d="m5 12.5 4.5 4.5L19 7" strokeWidth="2.6" />
  </StrokeIcon>
);

/* ==========================================================================
   Helpers
   ========================================================================== */
function WhatsAppButton({ children, large = false, className = "" }) {
  return (
    <a
      className={`cs-btn cs-btn-wa ${large ? "cs-btn-lg" : ""} ${className}`}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon size={large ? 24 : 20} />
      {children}
    </a>
  );
}

/* Fades an element in once it scrolls into view (respects reduced motion via CSS). */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`cs-reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ==========================================================================
   Sections
   ========================================================================== */
function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 820 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className="cs-header">
      <div className="cs-wrap cs-nav">
        <a className="cs-brand" href="#home" onClick={() => setOpen(false)}>
          <span className="cs-brand-mark" aria-hidden="true">
            {"</>"}
          </span>
          {BRAND_NAME}
        </a>

        <button
          type="button"
          className="cs-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="cs-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <StrokeIcon size={24}>
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </StrokeIcon>
        </button>

        <nav aria-label="Main">
          <ul id="cs-menu" className={`cs-links ${open ? "is-open" : ""}`}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="cs-hero">
      <div className="cs-wrap cs-hero-grid">
        <div>
          <h1>Coding Problems? We&apos;ve Got You Covered.</h1>
          <p className="cs-hero-sub">Get your coding problems solved quickly and easily.</p>
          <p className="cs-hero-desc">
            Send your coding problem and get a working solution with clear and simple explanation.
          </p>
          <WhatsAppButton large>Contact on WhatsApp</WhatsAppButton>
        </div>

        <div className="cs-editor" aria-hidden="true">
          <div className="cs-editor-bar">
            <span className="cs-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="cs-file">sample_solution.py</span>
          </div>
          <div className="cs-code">
            {SAMPLE_LINES.map((line, i) => (
              <div className="cs-line" key={i}>
                <span style={{ marginLeft: `${line.indent * 3}ch` }}>{line.node}</span>
              </div>
            ))}
          </div>
          <div className="cs-editor-note">
            <strong>Explanation</strong>
            <p>
              Lowercase the word, check each letter against the vowels, and add up the matches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Service() {
  return (
    <section id="service" className="cs-section">
      <div className="cs-wrap cs-service-grid">
        <div>
          <h2>What I Provide</h2>
          <p className="cs-lead">
            Send a problem, get a solution with an explanation. That&apos;s the whole service.
          </p>
        </div>

        <div className="cs-service-card">
          <ul>
            {SERVICE_ITEMS.map((item) => (
              <li key={item.title}>
                <span className="cs-tile">
                  <StrokeIcon>{item.icon}</StrokeIcon>
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Platforms() {
  return (
    <section id="platforms" className="cs-section cs-section-alt">
      <div className="cs-wrap">
        <h2>Platforms We Solve</h2>
        <div className="cs-platform-grid">
          {PLATFORMS.map((p) => (
            <article className="cs-platform" key={p.name}>
              <span className="cs-tile cs-tile-lg">
                <StrokeIcon size={28}>{p.icon}</StrokeIcon>
              </span>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
        <p className="cs-disclaimer">
          {BRAND_NAME} is an independent service and is not affiliated with, endorsed by, or
          sponsored by CodeTantra or NeoColab. Platform names are used only to describe the
          problems supported.
        </p>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="cs-section cs-pricing">
      <div className="cs-wrap">
        <h2>Simple &amp; Transparent Pricing</h2>

        <div className="cs-price-card">
          <div className="cs-price">{PRICE_TEXT}</div>
          <div className="cs-per">per unit</div>
          <div className="cs-formula">Contact us on WhatsApp for pricing</div>

          <ul className="cs-checks">
            {PRICE_FEATURES.map((f) => (
              <li key={f}>
                <span className="cs-check">
                  <CheckIcon />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <WhatsAppButton large className="cs-btn-block">
            Get Started on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="cs-section">
      <div className="cs-wrap">
        <h2>How It Works</h2>
        <div className="cs-steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className="cs-step">
              <span className="cs-step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="cs-section cs-section-alt">
      <div className="cs-wrap cs-contact">
        <h2>Need a Coding Problem Solved?</h2>
        <p className="cs-lead">Contact me directly on WhatsApp and send your problem.</p>
        <WhatsAppButton large>Chat on WhatsApp</WhatsAppButton>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="cs-footer">
      <div className="cs-wrap cs-footer-inner">
        <div>
          <div className="cs-footer-brand">{BRAND_NAME}</div>
          <p className="cs-footer-tag">Your Coding Problems, Solved.</p>
        </div>
        <p className="cs-footer-wa">
          WhatsApp:{" "}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            {whatsappDisplay}
          </a>
        </p>
      </div>
      <div className="cs-wrap cs-copy">
        © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      className="cs-float"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <span className="cs-float-label">Chat on WhatsApp</span>
      <span className="cs-float-icon">
        <WhatsAppIcon size={30} />
      </span>
    </a>
  );
}

/* ==========================================================================
   App
   ========================================================================== */
export default function App() {
  return (
    <div className="cs-app">
      <style>{styles}</style>
      <Navbar />
      <main>
        <Hero />
        <Service />
        <Platforms />
        <Pricing />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

/* ==========================================================================
   Styles (scoped with a cs- prefix so they don't collide with your project)
   ========================================================================== */
const styles = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap");

:root {
  --paper: #f4f6fa;
  --surface: #ffffff;
  --ink: #0f1b33;
  --muted: #526079;
  --line: #dce2ee;
  --accent: #2d5bff;
  --accent-soft: #e7edff;
  --wa: #0e8a45;
  --wa-hover: #0b7538;
  --font-display: "Bricolage Grotesque", "Segoe UI", system-ui, sans-serif;
  --font-body: "Instrument Sans", "Segoe UI", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --header-h: 64px;
}

html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

/* Neutralise default Vite template styles if they are still imported */
body { display: block; margin: 0; min-width: 0; place-items: initial; background: var(--paper); }
#root { max-width: none; margin: 0; padding: 0; text-align: left; }

.cs-app {
  font-family: var(--font-body);
  color: var(--ink);
  background: var(--paper);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
.cs-app *, .cs-app *::before, .cs-app *::after { box-sizing: border-box; }
:where(.cs-app) :is(h1, h2, h3, p, ul) { margin: 0; }
:where(.cs-app) ul { padding: 0; list-style: none; }
.cs-app a:focus-visible, .cs-app button:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
  border-radius: 8px;
}

.cs-wrap { width: 100%; max-width: 1120px; margin: 0 auto; padding: 0 1.25rem; }

.cs-app h1, .cs-app h2, .cs-app h3 { font-family: var(--font-display); letter-spacing: -0.02em; }
.cs-app h2 { font-size: clamp(1.9rem, 3.6vw, 2.7rem); font-weight: 700; line-height: 1.15; }
.cs-lead { color: var(--muted); font-size: 1.125rem; margin-top: 1rem; max-width: 34ch; }

/* ---------- Sections ---------- */
.cs-section { padding: clamp(4rem, 8vw, 7rem) 0; scroll-margin-top: var(--header-h); }
.cs-section-alt { background: var(--surface); border-block: 1px solid var(--line); }
#home, #service, #platforms, #pricing, #how-it-works, #contact { scroll-margin-top: var(--header-h); }

/* ---------- Buttons ---------- */
.cs-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.65rem;
  padding: 0.8rem 1.4rem; border-radius: 12px;
  font: 600 1rem/1.2 var(--font-body); text-decoration: none;
  transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.cs-btn-wa { background: var(--wa); color: #fff; box-shadow: 0 8px 20px -8px rgba(14, 138, 69, 0.7); }
.cs-btn-wa:hover { background: var(--wa-hover); transform: translateY(-2px); }
.cs-btn-lg { padding: 1.05rem 1.9rem; font-size: 1.1rem; border-radius: 14px; }
.cs-btn-block { width: 100%; }

/* ---------- Navbar ---------- */
.cs-header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(244, 246, 250, 0.88);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.cs-nav { height: var(--header-h); display: flex; align-items: center; justify-content: space-between; }
.cs-brand {
  display: inline-flex; align-items: center; gap: 0.6rem;
  font: 800 1.35rem/1 var(--font-display); letter-spacing: -0.03em;
  color: var(--ink); text-decoration: none;
}
.cs-brand-mark {
  display: inline-grid; place-items: center; height: 30px; padding: 0 0.5rem;
  background: var(--ink); color: #9fb8ff; border-radius: 8px;
  font: 500 0.8rem/1 var(--font-mono); letter-spacing: 0;
}
.cs-links { display: flex; gap: 0.25rem; }
.cs-links a {
  display: block; padding: 0.5rem 0.85rem; border-radius: 8px;
  color: var(--muted); font-weight: 500; text-decoration: none;
  transition: color 0.15s ease, background-color 0.15s ease;
}
.cs-links a:hover { color: var(--ink); background: var(--accent-soft); }
.cs-burger {
  display: none; align-items: center; justify-content: center;
  width: 44px; height: 44px; border: 1px solid var(--line); border-radius: 10px;
  background: var(--surface); color: var(--ink); cursor: pointer;
}

@media (max-width: 820px) {
  .cs-burger { display: inline-flex; }
  .cs-nav nav { position: absolute; top: 100%; left: 0; right: 0; }
  .cs-links {
    display: none; flex-direction: column; gap: 0;
    background: var(--paper); border-bottom: 1px solid var(--line);
    padding: 0.5rem 1.25rem 1rem;
    box-shadow: 0 20px 30px -20px rgba(15, 27, 51, 0.25);
  }
  .cs-links.is-open { display: flex; }
  .cs-links a { padding: 0.9rem 0.5rem; font-size: 1.05rem; border-radius: 8px; }
}

/* ---------- Hero ---------- */
.cs-hero {
  padding: clamp(3rem, 7vw, 6rem) 0 clamp(3.5rem, 8vw, 7rem);
  background-image: radial-gradient(var(--line) 1px, transparent 1px);
  background-size: 22px 22px;
}
.cs-hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3.5rem; align-items: center; }
.cs-hero h1 { font-size: clamp(2.4rem, 5.4vw, 4.1rem); font-weight: 800; line-height: 1.04; letter-spacing: -0.035em; }
.cs-hero-sub { font-size: clamp(1.15rem, 2vw, 1.35rem); font-weight: 600; margin-top: 1.5rem; }
.cs-hero-desc { color: var(--muted); font-size: 1.1rem; margin: 0.75rem 0 2rem; max-width: 46ch; }

.cs-editor {
  background: #0d1730; color: #dbe5ff; border-radius: 16px; overflow: hidden;
  box-shadow: 0 30px 60px -30px rgba(15, 27, 51, 0.55);
  border: 1px solid #1c2b52;
}
.cs-editor-bar {
  display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem;
  background: #111f40; border-bottom: 1px solid #1c2b52;
}
.cs-dots { display: inline-flex; gap: 6px; }
.cs-dots i { width: 10px; height: 10px; border-radius: 50%; background: #2b3d6b; }
.cs-file { font: 400 0.8rem var(--font-mono); color: #8fa2cf; }
.cs-code {
  counter-reset: ln; padding: 1.1rem 0.5rem 1.1rem 0; overflow-x: auto;
  font: 400 0.9rem/1.75 var(--font-mono);
}
.cs-line { white-space: pre; min-height: 1.75em; }
.cs-line::before {
  counter-increment: ln; content: counter(ln);
  display: inline-block; width: 2.5ch; margin: 0 1.5ch 0 1rem; text-align: right; color: #43558a;
}
.cs-c { color: #7c8fbd; }
.cs-k { color: #82a6ff; }
.cs-f { color: #ffd479; }
.cs-s { color: #8ee3b0; }
.cs-n { color: #ffb38a; }
.cs-editor-note { padding: 1rem 1.25rem 1.25rem; background: #111f40; border-top: 1px solid #1c2b52; }
.cs-editor-note strong { font: 600 0.95rem var(--font-display); color: #fff; }
.cs-editor-note p { margin-top: 0.35rem; font-size: 0.95rem; color: #b5c3e6; }

@media (max-width: 900px) {
  .cs-hero-grid { grid-template-columns: 1fr; gap: 3rem; }
}
@media (max-width: 480px) {
  .cs-code { font-size: 0.8rem; }
}

/* ---------- Service ---------- */
.cs-service-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 3.5rem; align-items: start; }
.cs-service-card {
  background: var(--surface); border: 1px solid var(--line); border-radius: 18px;
  padding: 0.5rem 1.75rem;
}
.cs-service-card li { display: flex; gap: 1rem; align-items: flex-start; padding: 1.25rem 0; }
.cs-service-card li + li { border-top: 1px solid var(--line); }
.cs-service-card h3 { font-size: 1.15rem; font-weight: 700; }
.cs-service-card p { color: var(--muted); margin-top: 0.15rem; }
.cs-tile {
  flex: none; display: inline-grid; place-items: center; width: 44px; height: 44px;
  border-radius: 12px; background: var(--accent-soft); color: var(--accent);
}
.cs-tile-lg { width: 56px; height: 56px; border-radius: 14px; }

@media (max-width: 860px) {
  .cs-service-grid { grid-template-columns: 1fr; gap: 2rem; }
  .cs-lead { max-width: 48ch; }
}

/* ---------- Platforms ---------- */
.cs-platform-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 2.5rem; }
.cs-platform { background: var(--paper); border: 1px solid var(--line); border-radius: 18px; padding: 2rem; }
.cs-platform h3 { font-size: 1.6rem; font-weight: 800; margin-top: 1.5rem; }
.cs-platform p { color: var(--muted); margin-top: 0.5rem; font-size: 1.05rem; }
.cs-disclaimer { margin-top: 1.75rem; color: var(--muted); font-size: 0.9rem; max-width: 70ch; }

@media (max-width: 700px) {
  .cs-platform-grid { grid-template-columns: 1fr; }
}

/* ---------- Pricing ---------- */
.cs-pricing { background: var(--ink); color: #fff; text-align: center; }
.cs-pricing h2 { color: #fff; }
.cs-price-card {
  max-width: 540px; margin: 2.75rem auto 0; padding: clamp(2rem, 5vw, 3.25rem);
  background: var(--surface); color: var(--ink); border-radius: 24px;
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.6);
}
.cs-price {
  font: 800 clamp(5rem, 18vw, 8.5rem)/0.95 var(--font-display); letter-spacing: -0.05em; color: var(--ink);
}
.cs-per { font: 600 1.35rem var(--font-display); color: var(--muted); margin-top: 0.5rem; }
.cs-formula {
  display: inline-block; margin: 1.5rem 0 1.75rem; padding: 0.55rem 1rem;
  background: var(--accent-soft); color: var(--accent); border-radius: 10px;
  font: 500 0.95rem var(--font-mono);
}
.cs-checks { display: grid; gap: 0.85rem; text-align: left; max-width: 340px; margin: 0 auto 2.25rem; }
.cs-checks li { display: flex; align-items: center; gap: 0.75rem; font-size: 1.05rem; font-weight: 500; }
.cs-check {
  flex: none; display: inline-grid; place-items: center; width: 24px; height: 24px;
  border-radius: 50%; background: #dff5e8; color: var(--wa);
}

/* ---------- How it works ---------- */
.cs-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2.5rem; }
.cs-step { background: var(--surface); border: 1px solid var(--line); border-radius: 18px; padding: 2rem; }
.cs-step-n { display: block; font: 800 2.75rem/1 var(--font-display); color: var(--accent); letter-spacing: -0.04em; }
.cs-step h3 { font-size: 1.3rem; font-weight: 700; margin-top: 1.25rem; }
.cs-step p { color: var(--muted); margin-top: 0.4rem; }

.cs-reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
.cs-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .cs-reveal { opacity: 1; transform: none; transition: none; }
  .cs-btn, .cs-float, .cs-float-label { transition: none; }
}

@media (max-width: 820px) {
  .cs-steps { grid-template-columns: 1fr; }
}

/* ---------- Contact ---------- */
.cs-contact { text-align: center; display: flex; flex-direction: column; align-items: center; }
.cs-contact .cs-lead { max-width: 44ch; margin: 1rem 0 2rem; }

/* ---------- Footer ---------- */
.cs-footer { background: var(--ink); color: #c5d0ea; padding: 3rem 0 1.5rem; }
.cs-footer-inner { display: flex; justify-content: space-between; align-items: flex-end; gap: 1.5rem; flex-wrap: wrap; }
.cs-footer-brand { font: 800 1.5rem var(--font-display); color: #fff; letter-spacing: -0.03em; }
.cs-footer-tag { margin-top: 0.35rem; }
.cs-footer-wa a { color: #fff; font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
.cs-footer-wa a:hover { color: #9fb8ff; }
.cs-copy { margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid #22335c; font-size: 0.9rem; color: #93a3c8; }

/* ---------- Floating WhatsApp ---------- */
.cs-float {
  position: fixed; z-index: 60;
  right: calc(1.25rem + env(safe-area-inset-right, 0px));
  bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));
  display: inline-flex; align-items: center;
  background: var(--wa); color: #fff; text-decoration: none;
  height: 60px; border-radius: 30px;
  box-shadow: 0 12px 28px -8px rgba(14, 138, 69, 0.75);
  transition: background-color 0.2s ease, transform 0.25s ease;
}
.cs-float-icon { display: grid; place-items: center; width: 60px; height: 60px; flex: none; }
.cs-float-label {
  max-width: 0; overflow: hidden; white-space: nowrap; font-weight: 600;
  transition: max-width 0.3s ease, padding 0.3s ease;
}
.cs-float:hover { background: var(--wa-hover); transform: translateY(-3px) scale(1.04); }
.cs-float:hover .cs-float-icon svg { animation: cs-wiggle 0.6s ease; }
@media (hover: hover) {
  .cs-float:hover .cs-float-label { max-width: 180px; padding-left: 1.25rem; }
}
@keyframes cs-wiggle {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-14deg); }
  75% { transform: rotate(14deg); }
}
@media (prefers-reduced-motion: reduce) {
  .cs-float:hover .cs-float-icon svg { animation: none; }
}
`;
