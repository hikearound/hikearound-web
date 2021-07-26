const { withSentryConfig } = require('@sentry/nextjs');
const { i18n } = require('./next-i18next.config');

const moduleExports = {
    async headers() {
        return [
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, stale-while-revalidate',
                    },
                ],
            },
        ];
    },
    images: {
        domains: [
            'res.cloudinary.com',
            'firebasestorage.googleapis.com',
            'googleapis.com',
        ],
        loader: 'cloudinary',
        path: 'https://res.cloudinary.com/hikearound/',
    },
    i18n,
};

const sentryWebpackPluginOptions = {};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
