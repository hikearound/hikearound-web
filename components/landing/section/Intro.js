import React from 'react';
import styled from 'styled-components';
import { Section, SectionBlock, ContentImage } from '../../../styles/landing';
import TextSection from '../Text';
import AppStoreBadge from '../Badge';
import { device } from '../../../constants/breakpoints';
import { spacing } from '../../../constants/spacing';

class IntroSection extends React.PureComponent {
    renderBadge = () => {
        return <AppStoreBadge />;
    };

    renderPhone = () => {
        return (
            <ContentImage inflate>
                <Phone src='/images/landing/01.png' />
            </ContentImage>
        );
    };

    render() {
        return (
            <Section>
                <SectionBlock direction='column'>
                    <TextSection
                        title='Only trails, never fails.'
                        description='Hikearound is the easiest way to discover, save, and share great local hikes.'
                        renderExtra={this.renderBadge()}
                        includeBlock
                        offsetTop
                    />
                    {this.renderPhone()}
                </SectionBlock>
            </Section>
        );
    }
}

export default IntroSection;

export const Phone = styled.img`
    max-width: 600px;
    margin-right: -120px;
    position: relative;
    top: ${spacing.md};

    @media ${device.tablet} {
        margin-right: 0;
        left: ${spacing.xs};
        top: 0;
    }
`;
