import React from 'react';
import styled from 'styled-components';
import Page from '../layouts/main';
import IntroSection from '../components/landing/section/Intro';
import CarouselSection from '../components/landing/section/Carousel';
import MapSection from '../components/landing/section/Map';
import DownloadSection from '../components/landing/section/Download';
import FooterSection from '../components/landing/section/Footer';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Hikearound | Get out and hike something',
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
        const { title } = this.state;

        return (
            <Page
                singleColumn
                fullWidth
                title={title}
                mainColumn={this.renderMainColumn()}
            />
        );
    }
}

export default HomePage;

const RootView = styled.div`
    width: 100%;
    text-align: center;
    overflow: hidden;
`;
