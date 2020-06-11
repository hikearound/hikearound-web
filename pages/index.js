import React from 'react';
import styled from 'styled-components';
import Page from '../layouts/main';
import { offsets } from '../constants/dimensions';
import colors from '../constants/colors';

class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Hikearound | Get out and hike something',
        };
    }

    renderMainColumn = () => {
        return <RootView>{this.renderIntro()}</RootView>;
    };

    renderIntro = () => {
        return (
            <Section>
                <SectionBlock>
                    <ContentBlock>
                        <ContentTitle>Only trails, never fails.</ContentTitle>
                        <ContentDescription>
                            Hikearound is the easiest way to find, save, and
                            share great local hikes.
                        </ContentDescription>
                        <a href='/' target='_blank' rel='noreferrer'>
                            <AppStoreBadge src='/images/external/app-store-badge.svg' />
                        </a>
                    </ContentBlock>
                    <ContentImage>
                        <Phone src='/images/landing/01.png' />
                    </ContentImage>
                </SectionBlock>
            </Section>
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
`;

const Section = styled.div`
    &:first-of-type {
        background-color: white;
        padding-top: ${offsets.header};
    }
`;

const SectionBlock = styled.div`
    max-width: 970px;
    margin: 0 auto;
    display: flex;
`;

const ContentBlock = styled.div`
    text-align: left;
    width: 40%;
    margin: auto 0;
`;

const ContentTitle = styled.h2`
    display: block;
    width: 100%;
    font-size: 26px;
    font-weight: 600;
    margin-top: -60px;
`;

const ContentDescription = styled.span`
    display: block;
    width: 100%;
    font-size: 16px;
    margin-top: 10px;
    line-height: 1.3;
    color: ${colors.grayDark};
`;

const ContentImage = styled.div`
    display: flex;
    width: 60%;
    justify-content: end;
`;

const Phone = styled.img`
    max-width: 600px;
    margin-right: -120px;
    position: relative;
    top: 10px;
`;

const AppStoreBadge = styled.img`
    margin-top: 15px;
    width: 125px;
`;
