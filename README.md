# hikearound-web

[![CI](https://github.com/hikearound/hikearound-web/actions/workflows/ci.yml/badge.svg?branch=master&event=push)](https://github.com/hikearound/hikearound-web/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/hikearound/hikearound-web)](LICENSE)

A Next.js web app for discovering and sharing curated hiking trails. Server-rendered hike pages with SEO metadata, Algolia search, and Apple MapKit integration; backed by Firebase and instrumented with Sentry.

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp env.local.tmp .env.local
# Fill in your API keys

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Development

```bash
npm run dev             # Start dev server
npm run build           # Production build
npm run storybook       # Component explorer (port 6006)
```

## Project Structure

```text
hikearound-web/
├── components/    # Reusable React components
├── config/        # Configuration files
├── constants/     # Application constants
├── layouts/       # Page layouts
├── lib/           # Library code and integrations
├── pages/         # Next.js pages and API routes
├── public/        # Static assets
├── scss/          # SCSS stylesheets
├── stories/       # Storybook stories
├── styles/        # Global styles
└── utils/         # Utility functions
```

## Related

-   [hikearound-app](https://github.com/hikearound/hikearound-app) - iOS client
-   [hikearound-cloud-functions](https://github.com/hikearound/hikearound-cloud-functions) - Cloud Functions backend
