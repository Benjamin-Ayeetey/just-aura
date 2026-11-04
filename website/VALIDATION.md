# Validation

- Production build passes; application JS is approximately 141 kB / 53 kB gzip after selecting only used Solar icons.
- npm dependency audit after upgrading sharp: zero reported vulnerabilities.
- Browser checked desktop and 390 × 844 mobile layouts; no horizontal document overflow or missing loaded images on mobile; no browser errors captured.
- Mobile menu opens and anchor navigation closes it. Photo dialog opens, has a named close control, and Escape dismisses it.
- Booking form validated with fictional preview data; enquiry text matches input and clearly indicates nothing is sent. Escape returns focus to the submit control.
- Code reviewed: exactly one smooth scroll engine; reduced motion bypasses Lenis, GSAP introductions, pinning, parallax and split headings. Desktop static gallery remains scrollable without animation. Semantic page content exists directly in HTML, not client-rendered.
- Full reduced-motion OS emulation and JavaScript-disabled browser runs were not performed; their fallback branches were inspected in source.
- Sample contact details and local enquiry generation are intentional. Live delivery, real contact details, and licensed Austin Signature font assets remain launch configuration items.
