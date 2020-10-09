export function renderLinks(t) {
    return [
        {
            text: t('section.collect'),
            link: '#what-we-collect',
        },
        {
            text: t('section.useInfo'),
            link: '#how-we-use-information',
        },
        {
            text: t('section.shareInfo'),
            link: '#how-information-is-shared',
        },
        {
            text: t('section.ads'),
            link: '#ads',
        },
        {
            text: t('section.choices'),
            link: '#your-choices',
        },
        {
            text: t('section.other'),
            link: '#other-information',
        },
    ];
}

export default renderLinks;
