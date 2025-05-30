import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import MarqueeCard from '../../components/marquee/Card';

// Initialize i18next
i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common', 'hike'],
    defaultNS: 'hike',
    resources: {
        en: {
            common: require('../../public/static/locales/en/common.json'),
            hike: require('../../public/static/locales/en/hike.json'),
        },
    },
    interpolation: {
        escapeValue: false,
    },
});

export default {
    title: 'Components/MarqueeCard',
    component: MarqueeCard,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <I18nextProvider i18n={i18n}>
                <Story />
            </I18nextProvider>
        ),
    ],
};

const Template = (args) => <MarqueeCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'Mount Tamalpais Loop',
    city: 'Mill Valley',
    state: 'CA',
    review: {
        average: 4.5,
        count: 1234,
    },
    coverPhoto:
        'https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    distance: 7.2,
    elevation: 2500,
    difficulty: 'moderate',
    hid: 'mount-tamalpais-loop',
};

export const EasyHike = Template.bind({});
EasyHike.args = {
    ...Default.args,
    name: 'Easy Valley Trail',
    difficulty: 'easy',
    distance: 2.5,
    elevation: 500,
    hid: 'easy-valley-trail',
};

export const HardHike = Template.bind({});
HardHike.args = {
    ...Default.args,
    name: 'Challenging Peak Trail',
    difficulty: 'difficult',
    distance: 12.5,
    elevation: 4500,
    hid: 'challenging-peak-trail',
};
