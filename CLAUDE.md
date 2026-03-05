# Hikearound Web

## Project Overview

Next.js web app for Hikearound. Provides server-rendered hike pages with search, maps, and internationalization.

**Tech Stack**: Next.js 12, React 17, Firebase, Algolia, SCSS, Storybook, Sentry

## Development

```bash
npm run dev             # Start dev server
npm run build           # Production build
npm run storybook       # Component explorer (port 6006)
```

## Architecture

- **Pages Router**: All routes in `pages/` directory (Next.js 12 pages router)
- **Components**: Reusable UI in `components/`, organized by feature
- **Layouts**: Page wrappers in `layouts/`
- **Styling**: SCSS modules in `scss/` and `styles/`
- **Config**: Firebase, Algolia, Sentry setup in `config/` and `lib/`
- **i18n**: Translations via next-i18next

## Code Style

- ESLint with Airbnb config
- Prettier inline config (4-space indent, single quotes, trailing commas)
- JSX uses single quotes

## Environment Setup

Copy `env.local.tmp` to `.env.local` and fill in API keys for Firebase, Algolia, Sentry, Cloudinary, and Prismic.

## Related Repositories

- [hikearound-app](https://github.com/hikearound/hikearound-app) - iOS client
- [hikearound-cloud-functions](https://github.com/hikearound/hikearound-cloud-functions) - Cloud Functions backend
