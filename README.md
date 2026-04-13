# PlateIQ — AI Restaurant Review Intelligence Platform

> **Your AI engine for smarter menus and happier customers**

PlateIQ transforms raw, unstructured customer reviews into actionable insights, helping cloud kitchens and restaurants optimise their menus, reduce complaints, and grow revenue.

## Features

- **AI Review Intelligence Engine** — Upload reviews via CSV or text input; extract oil level, spice level, quantity, and taste sentiment automatically.
- **Granular Feature-Level Sentiment Analysis** — Per-feature bar charts (oil, spice, quantity, taste).
- **Trend & Pattern Detection** — Line charts showing complaint trends over time.
- **AI Recommendation Engine** — Specific, prioritised actions (e.g. "Reduce oil by 10–15%") with confidence scores.
- **Smart Menu Customisation Suggestions** — New menu options and dynamic pricing ideas with revenue opportunity estimates.
- **Dark Mode** — Fully supported, persisted to `localStorage`.
- **Responsive Design** — Works on mobile and desktop.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Charts | Recharts |
| Icons | Lucide React |
| Auth / DB | Mock (ready for Supabase integration) |

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, features, pricing, testimonials |
| `/auth` | Login / Signup |
| `/dashboard` | Main app (protected route) |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Folder Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── SentimentChart.jsx
│   │   └── TrendChart.jsx
│   ├── FeatureCard.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── PricingCard.jsx
│   └── TestimonialCard.jsx
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── pages/
│   ├── AuthPage.jsx
│   ├── Dashboard.jsx
│   └── LandingPage.jsx
├── services/
│   └── authService.js
├── utils/
│   └── mockAI.js
├── App.jsx
└── main.jsx
```

## Target Audience

- Cloud kitchens
- Small to mid-scale restaurants
- Multi-branch food businesses
- Swiggy / Zomato sellers
- Restaurant consultants
