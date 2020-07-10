import React from 'react';
import styled from 'styled-components';
import {
    Section,
    SectionBlock,
    ContentImage,
    PhoneBase,
} from '../../../styles/landing';
import TextSection from '../Text';
import { device } from '../../../constants/breakpoints';
import { spacing } from '../../../constants/spacing';
import { componentSpacing } from '../../../constants/landing';

class MapSection extends React.PureComponent {
    renderPhone = () => {
        return (
            <ContentImage justifyLeft>
                <Phone src='/images/landing/02.png' />
            </ContentImage>
        );
    };

    render() {
        return (
            <Section>
                <SectionBlock direction='column-reverse'>
                    {this.renderPhone()}
                    <TextSection
                        title='Start local, go global.'
                        description='Browse nearby hikes or expand your search across the entire country to find the perfect trail.'
                        includeBlock
                    />
                </SectionBlock>
            </Section>
        );
    }
}

export default MapSection;

export const Phone = styled(PhoneBase)`
    max-width: 375px;
    position: relative;
    top: ${componentSpacing.md};
    margin-bottom: ${componentSpacing.sm};

    @media ${device.tablet} {
        top: -${spacing.lg};
        margin: 0 auto -${componentSpacing.xl} auto;
    }
`;
