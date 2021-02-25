import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../layouts/main';
import IntroSection from '../components/landing/section/Intro';
import CarouselSection from '../components/landing/section/Carousel';
import MapSection from '../components/landing/section/Map';
import DownloadSection from '../components/landing/section/Download';
import FooterSection from '../components/landing/section/Footer';

const Homepage = () => {
    const { t } = useTranslation('common');

    const renderMainColumn = () => {
        return (
            <RootView>
                <IntroSection />
                <CarouselSection />
                <MapSection />
                <DownloadSection />
                <FooterSection />
            </RootView>
        );
    };

    return (
        <Page
            singleColumn
            fullWidth
            title={t('slogan', { appName: t('appName') })}
            mainColumn={renderMainColumn()}
        />
    );
};

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            'common',
            'hike',
            'landing',
            'header',
            'footer',
        ])),
    },
});

export default Homepage;

const RootView = styled.div`
    width: 100%;
    text-align: center;
    overflow: hidden;
`;
