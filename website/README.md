# Just Aura

Run `npm install`, then `npm run dev`. Build with `npm run build`; serve the production result with `npm run preview`.

Original brand references and photographs remain in `brand/` and `assets/`. `node scripts/assets.mjs` regenerates optimized photographs. See DESIGN.md for brand analysis and art direction.

Contact configuration lives in `src/config.js`. Sample contacts are intentional. The booking form validates fields and prepares a downloadable enquiry locally; it does not send requests, process payments, or confirm bookings. Connect a real enquiry service before launch and provide its privacy information. No entered information is persisted in browser storage.

Typography: self-hosted Montserrat via Fontsource (SIL Open Font License), plus the supplied Austin Signature TTF for selected accents. Icons: Solar via Iconify (MIT). Motion: GSAP + ScrollTrigger and Lenis, bypassed for reduced motion. No WebGL. Images: exclusively user-provided.


This is an independent Vite project. Run `npm ci`, then `npm run dev` inside `website/`. Build with `npm run build` and preview with `npm run preview`. Its assets, scripts, dependencies and output live entirely in this folder. The separate billing tool lives in `../billing/`.
