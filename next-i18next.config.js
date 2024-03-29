const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'en',
        compatibilityJSON: 'v3',
        locales: ['en', 'es'],
    },
    localePath: path.resolve('./public/static/locales'),
    react: {
        useSuspense: false,
        // wait: true,
    },
};
