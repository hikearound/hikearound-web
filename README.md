# Hikearound Web

A React-based web application serving as a companion to the Hikearound iOS app. This project is built with Next.js and provides a modern, responsive web interface for hikers to discover and share trails.

## Features

-   🚀 Modern React-based web application
-   ⚡ Next.js framework for server-side rendering
-   🌐 Internationalization support (i18n)
-   🔥 Firebase integration
-   🔍 Algolia search integration
-   🐛 Sentry error tracking
-   📱 Responsive design for all devices

## Prerequisites

-   Node.js 18.x
-   npm package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/pdugan20/hikearound-web.git
cd hikearound-web
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp env.local.tmp .env.local
```

Then fill in your environment variables in the `.env.local` file.

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Storybook

This project uses Storybook for component development and documentation. To run Storybook:

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`.

### Writing Stories

Stories are located in the `stories` directory alongside their components. Each story file should:

-   Use the `.stories.js` extension
-   Export a default object with component metadata
-   Include one or more stories that showcase different states of the component

Example story structure:

```jsx
import React from 'react';
import { MyComponent } from './MyComponent';

export default {
    title: 'Components/MyComponent',
    component: MyComponent,
};

export const Default = () => <MyComponent />;
export const WithProps = () => <MyComponent prop1='value' />;
```

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Project Structure

```
hikearound-web/
├── components/    # Reusable React components
├── pages/         # Next.js pages and API routes
├── public/        # Static assets
├── styles/        # Global styles and SCSS
├── utils/         # Utility functions
├── constants/     # Application constants
├── layouts/       # Page layouts
├── lib/           # Library code and configurations
└── config/        # Configuration files
```

## Technologies Used

-   Next.js 12.x
-   React 17.x
-   Firebase
-   Algolia Search
-   Sentry
-   SCSS
-   i18next

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
