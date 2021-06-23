import Router from 'next/router';
import * as gtag from '@lib/gtag';

export function initAnalytics() {
    Router.events.on('routeChangeComplete', (url) => {
        gtag.pageview(url);
    });
}

export default initAnalytics;
