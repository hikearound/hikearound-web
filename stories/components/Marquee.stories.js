import React from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';
import { StyledSection } from '../../styles/landing';
import TextSection from '../../components/landing/Text';
import Card from '../../components/marquee/Card';
import LoadingCard from '../../components/marquee/LoadingCard';

// Initialize i18n for Storybook
i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common', 'landing', 'hike'],
    defaultNS: 'common',
    resources: {
        en: {
            common: {
                'card.title.map': 'Map',
                review: '{{count}} reviews',
            },
            landing: {
                'section.marquee.title': 'The path is yours to choose.',
                'section.marquee.description':
                    "No matter your skill level or experience, you'll find hikes that you and your friends will love.",
            },
            hike: {
                'difficulty.easy': 'Easy',
                'difficulty.moderate': 'Moderate',
                'difficulty.difficult': 'Hard',
                'measurement.distance': '{{distance}} miles',
                'measurement.elevation': '{{elevation}} feet',
            },
        },
    },
    interpolation: {
        escapeValue: false,
    },
});

// Mock data for featured hikes
const mockHikes = [
    {
        name: 'Mount Tamalpais Loop',
        city: 'Mill Valley',
        state: 'CA',
        review: {
            average: 4.5,
            count: 128,
        },
        coverPhoto:
            'https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        distance: 7.2,
        elevation: 2500,
        difficulty: 'moderate',
        hid: 'mt-tam-loop',
    },
    {
        name: 'Dipsea Trail',
        city: 'Stinson Beach',
        state: 'CA',
        review: {
            average: 3.8,
            count: 256,
        },
        coverPhoto:
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        distance: 7.4,
        elevation: 2200,
        difficulty: 'difficult',
        hid: 'dipsea-trail',
    },
    {
        name: 'Muir Woods Loop',
        city: 'Mill Valley',
        state: 'CA',
        review: {
            average: 2.7,
            count: 189,
        },
        coverPhoto:
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        distance: 2.1,
        elevation: 500,
        difficulty: 'easy',
        hid: 'muir-woods-loop',
    },
    {
        name: 'Point Reyes Lighthouse Trail',
        city: 'Point Reyes Station',
        state: 'CA',
        review: {
            average: 4.2,
            count: 312,
        },
        coverPhoto:
            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        distance: 5.8,
        elevation: 1800,
        difficulty: 'moderate',
        hid: 'point-reyes-lighthouse',
    },
];

// Styled components for the story
const CenteredTextBlock = styled.div`
    text-align: center;
    width: 100%;
    padding: 0 20px;
`;

// Mock Marquee component
const MockMarqueeSection = ({ speed, direction }) => {
    const [hikes, setHikes] = React.useState(null);
    const { t } = useTranslation(['landing']);

    React.useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setHikes(mockHikes);
        }, 500);
    }, []);

    const renderMarquee = () => (
        <Marquee
            play
            pauseOnHover
            gradient={false}
            pauseOnClick={false}
            speed={speed}
            direction={direction}
        >
            {hikes.map(
                (
                    {
                        name,
                        city,
                        state,
                        coverPhoto,
                        review,
                        distance,
                        elevation,
                        difficulty,
                        hid,
                    },
                    index,
                ) => (
                    <Card
                        name={name}
                        city={city}
                        state={state}
                        coverPhoto={coverPhoto}
                        review={review}
                        distance={distance}
                        elevation={elevation}
                        difficulty={difficulty}
                        hid={hid}
                        key={index}
                    />
                ),
            )}
        </Marquee>
    );

    const renderLoadingState = () => (
        <LoadingWrapper>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
        </LoadingWrapper>
    );

    return (
        <StyledSection marginTop offset='true'>
            <CenteredTextBlock>
                <TextSection
                    centered
                    title={t('section.marquee.title')}
                    description={t('section.marquee.description')}
                />
            </CenteredTextBlock>
            {!hikes && renderLoadingState()}
            {hikes && renderMarquee()}
        </StyledSection>
    );
};

const LoadingWrapper = styled.div`
    display: flex;
`;

// Translation decorator
const withTranslation = (Story) => (
    <I18nextProvider i18n={i18n}>
        <Story />
    </I18nextProvider>
);

export default {
    title: 'Components/Landing/Marquee',
    component: MockMarqueeSection,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [withTranslation],
};

const Template = (args) => (
    <I18nextProvider i18n={i18n}>
        <MockMarqueeSection {...args} />
    </I18nextProvider>
);

export const Default = Template.bind({});
Default.args = {
    speed: 40,
    direction: 'right',
};

export const SlowSpeed = Template.bind({});
SlowSpeed.args = {
    ...Default.args,
    speed: 20,
};

export const LeftDirection = Template.bind({});
LeftDirection.args = {
    ...Default.args,
    direction: 'left',
};
