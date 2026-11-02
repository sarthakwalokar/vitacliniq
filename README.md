# VitaCliniq Global Research — Clinical Research Organization (CRO) Multi-Page Suite

A fully responsive, production-ready, multi-page HTML5, CSS3, and Vanilla JavaScript template created by carefully analyzing and synthesizing the design systems, content architecture, and user experience of three leading clinical research organizations:

1. **[Clinexel Life Sciences](https://clinexel.com/)** — Full-Service CRO, Regulatory & Pharmacovigilance Leader
2. **[JSS Medical Research](https://www.jssresearch.com/)** — Global Scientific Excellence & Agile Clinical Trials
3. **[ProRelix Research](https://prorelixresearch.com/our-people/)** — Pioneering CRO Leadership & "Our People" Team Showcase

---

## 📱 Responsiveness & Mobile Enhancements

The entire codebase has been thoroughly updated for responsive behavior across mobile, tablet, and desktop viewports:
* **Adaptive Top Contact Ribbon**: Scales cleanly from full international numbers down to essential hotlines on small mobile screens without layout wrapping bugs.
* **Animated Hamburger Drawer**: Custom animated hamburger button with smooth slide-out navigation drawer (`.nav-menu.open`), dark backdrop overlay (`.nav-backdrop`), and touch scroll lock (`body.menu-open`).
* **Mobile Submenu Accordions**: Multi-level dropdown menus smoothly expand on tap on tablet and mobile without clipping.
* **Horizontal Scroll Filter Bars**: Service and Leadership filter buttons are wrapped in responsive touch-scrollable pill bars to prevent clunky multi-line wrapping on mobile.
* **Fluid Layouts**: Grids automatically adjust from 4 columns &rarr; 2 columns &rarr; 1 column using fluid `minmax()` breakpoints.
* **Touch-Safe Form Controls**: Form inputs are sized at 16px to prevent iOS Safari auto-zoom issues on focus.

---

## 📂 Multi-Page Architecture

```
.
├── index.html            # Main Portal: Hero, 3 R's, Services Preview, Live Metrics, Leadership Spotlight
├── about.html            # About Us: Company Story, Mission, Quality System, ISO & CDSCO Certifications
├── our-people.html       # Our People: Dedicated Leadership, Board of Directors, Bio Modals (ProRelix style)
├── services.html         # Clinical Services: Phase I–IV, Safety, Regulatory, Medical Writing, Biometrics, Devices
├── therapeutics.html     # Therapeutic Focus: Oncology, Cardiology, CNS, Immunology, Rare Diseases, Devices
├── global-reach.html     # Global Footprint: The AICROS Collaborative Network & Regional Hubs (US, EU, India, UAE)
├── contact.html          # Contact & RFQ Portal: Regional Offices, Sponsor RFP Form, Feasibility Calculator
├── css/
│   └── style.css         # Unified responsive styling, CSS variables & animations
├── js/
│   └── main.js           # Vanilla JS: drawer navigation, counters, modals, filters, feasibility tool
└── README.md             # Documentation and guide
```

---

## 🎨 Synthesis Breakdown Across the 3 References

| Feature / Element | Reference Origin | Multi-Page Implementation |
| :--- | :--- | :--- |
| **Top Announcement Ribbon** | `clinexel.com` | International hotlines (USA, India, Canada, UAE), direct corporate email, and instant compliance indicators (CDSCO, ISO 9001, ISO 27001). |
| **Corporate Brand Colors** | All 3 Sites | Deep Medical Navy (`#0A192F` - Clinexel/JSS), Life Science Teal (`#0D9488` / `#14B8A6` - ProRelix), and Breakthrough Orange (`#F26224` - JSS Medical). |
| **The 3 R's Methodology** | `jssresearch.com` | Prominently featured on `index.html` and expanded on `about.html`: **RESPONSIVE**, **RELIABLE**, and **RESULTS**. |
| **"Our People" Leadership** | `prorelixresearch.com/our-people/` | Dedicated `our-people.html` page with credential hierarchy (MD, PhD, FACP, RAC), categories, and interactive **Bio Modals**. |
| **Therapeutic Areas Matrix** | `prorelixresearch.com` | Dedicated `therapeutics.html` with disease-specific patient metrics, recruitment strategies, and endpoints. |
| **AICROS Global Alliance** | `clinexel.com` & `jssresearch.com` | Dedicated `global-reach.html` explaining the centralized sponsor oversight + native local execution model. |
| **Interactive Feasibility Tool** | Custom Synthesis | Integrated on `contact.html` and homepage allowing biotechs to model site activation and DB lock times. |
| **"Talk to Our Experts" / RFQ** | `clinexel.com` | Dual-column contact portal on `contact.html` with regional office addresses + confidential RFP form under mutual NDA. |

---

## 🌐 Browser Compatibility & Standards
- **100% HTML5 Semantic Standards** with zero mismatched or unclosed tags.
- **Zero Heavy Dependencies**: Pure Vanilla JS & native CSS without bulky frameworks.
- Fully compatible with modern evergreen browsers: Chrome, Edge, Safari, Firefox, and mobile Safari/Chrome.
