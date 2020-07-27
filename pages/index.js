import React from 'react';
import styled from 'styled-components';
import Page from '../layouts/main';
import IntroSection from '../components/landing/section/Intro';
import CarouselSection from '../components/landing/section/Carousel';
import MapSection from '../components/landing/section/Map';
import DownloadSection from '../components/landing/section/Download';
import FooterSection from '../components/landing/section/Footer';
import { withTranslation } from '../utils/i18n';

class HomePage extends React.Component {
    static getInitialProps() {
        return {
            namespacesRequired: ['common', 'landing', 'header', 'footer'],
        };
    }

    renderMainColumn = () => {
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

    render() {
        const { t } = this.props;

        return (
            <Page
                singleColumn
                fullWidth
                title={t('slogan', { appName: t('appName') })}
                mainColumn={this.renderMainColumn()}
            />
        );
    }
}

export default withTranslation('common')(HomePage);

const RootView = styled.div`
    width: 100%;
    text-align: center;
    overflow: hidden;
`;
