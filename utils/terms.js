export function renderLinks(t) {
    return [
        {
            text: t('section.access'),
            link: '#access',
        },
        {
            text: t('section.use'),
            link: '#use',
        },
        {
            text: t('section.security'),
            link: '#security',
        },
        {
            text: t('section.restricted'),
            link: '#restricted',
        },
        {
            text: t('section.indemnity'),
            link: '#indemnity',
        },
        {
            text: t('section.disclaimers'),
            link: '#disclaimers',
        },
        {
            text: t('section.liability'),
            link: '#liability',
        },
        {
            text: t('section.governing'),
            link: '#governing',
        },
        {
            text: t('section.changes'),
            link: '#changes',
        },
        {
            text: t('section.termination'),
            link: '#termination',
        },
        {
            text: t('section.misc'),
            link: '#misc',
        },
    ];
}

export default renderLinks;
