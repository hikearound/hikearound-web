const withSourceMaps = require('@zeit/next-source-maps')();
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const { i18n } = require('./next-i18next.config');

const {
    NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
    SENTRY_ORG,
    SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN,
    NODE_ENV,
} = process.env;

process.env.SENTRY_DSN = SENTRY_DSN;

module.exports = withSourceMaps({
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
    webpack: (config, options) => {
        if (!options.isServer) {
            config.resolve.alias['@sentry/node'] = '@sentry/browser';
        }

        if (
            SENTRY_DSN &&
            SENTRY_ORG &&
            SENTRY_PROJECT &&
            SENTRY_AUTH_TOKEN &&
            NODE_ENV === 'production'
        ) {
            config.plugins.push(
                new SentryWebpackPlugin({
                    include: '.next',
                    ignore: ['node_modules'],
                    urlPrefix: '~/_next',
                    release: options.buildId,
                }),
            );
        }
        return config;
    },
    i18n,
});
