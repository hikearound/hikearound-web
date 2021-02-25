import { gtagConfig } from '../constants/analytics';

const { NEXT_PUBLIC_GA_TRACKING_ID } = process.env;

export const pageview = (url) => {
    window.gtag('config', NEXT_PUBLIC_GA_TRACKING_ID, {
        cookie_flags: gtagConfig,
        page_path: url,
    });
};

export const event = ({ action, category, label, value }) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
    });
};
