import React from 'react';
import styled from 'styled-components';
import Page from '../layouts/main';
import { colors } from '../constants/colors';
import { device } from '../constants/breakpoints';
import { offsets } from '../constants/dimensions';

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
                    <TextSection>
                        <ContentBlock>
                            <ContentTitle>
                                Only trails, never fails.
                            </ContentTitle>
                            <ContentDescription>
                                Hikearound is the easiest way to find, save, and
                                share great local hikes.
                            </ContentDescription>
                            <a href='/' target='_blank' rel='noreferrer'>
                                <AppStoreBadge src='/images/external/app-store-badge.svg' />
                            </a>
                        </ContentBlock>
                    </TextSection>
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

    @media ${device.phone} {
        overflow: hidden;

        &:first-of-type {
            padding-top: 0;
        }
    }
`;

const SectionBlock = styled.div`
    max-width: 970px;
    margin: 0 auto;
    display: flex;
    padding: 0 20px;

    @media ${device.phone} {
        flex-direction: column;
        max-width: 100%;
        padding: 0;
    }
`;

const TextSection = styled.div`
    padding: 0;
    margin: auto 0;
    position: relative;
    top: -30px;

    @media ${device.phone} {
        padding: 40px 70px;
        top: 0;
    }
`;

const ContentBlock = styled.div`
    text-align: left;
    margin: auto 0;

    a {
        display: inline-block;
        margin-top: 20px;
    }

    @media ${device.phone} {
        width: 100%;
        margin: 0;
    }
`;

const ContentTitle = styled.h2`
    display: block;
    width: 100%;
    font-size: 32px;
    font-weight: bold;
    line-height: 1.2;
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

    @media ${device.phone} {
        width: 120%;
    }
`;

const Phone = styled.img`
    max-width: 600px;
    margin-right: -120px;
    position: relative;
    top: 10px;

    @media ${device.phone} {
        margin-right: 0;
        left: 5px;
    }
`;

const AppStoreBadge = styled.img`
    width: 125px;
`;
