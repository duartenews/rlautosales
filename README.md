# RL Auto Sales — Single-Page Used SUV Dealership

Premium, conversion-focused single-page experience for RL Auto Sales. Built with React, Vite, and Tailwind. All data is stored locally on the user device (localStorage) for now, with a storage abstraction ready to swap to an API later.

## Features
- Sticky header with smooth anchor navigation
- Hero, quick actions, featured inventory, full inventory with client-side filters (price, make, body type, fuel, mileage, search)
- Favorites, finance calculator (saves last inputs), trade-in draft, and contact draft saved locally
- Specials, why-buy, about, contact/location, and footer with legal note
- Responsive, mobile-first UI with Montserrat/Inter typography and RL Auto Sales palette

## Tech
- React + Vite
- Tailwind CSS (via `@tailwindcss/postcss`)
- Local storage service abstraction (`src/utils/storage.js`)

## Running locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Deployment
Built for Vercel (static). After pushing to GitHub, create a new Vercel project pointing to this repo. Build command: `npm run build`. Output directory: `dist`.
