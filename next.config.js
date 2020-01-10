const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')();

module.exports = withCSS(
    withSourceMaps({
        webpack: (config, options) => {
            if (!options.isServer) {
                config.resolve.alias['@sentry/node'] = '@sentry/browser';
            }
            return config;
        },
    }),
);
