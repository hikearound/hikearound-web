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
import { withTranslation } from '../../../utils/i18n';

class MapSection extends React.PureComponent {
    renderPhone = () => {
        return (
            <ContentImage justifyLeft>
                <Phone src='/images/landing/02.png' />
            </ContentImage>
        );
    };

    render() {
        const { t } = this.props;

        return (
            <Section>
                <SectionBlock direction='column-reverse'>
                    {this.renderPhone()}
                    <TextSection
                        title={t('section.map.title')}
                        description={t('section.map.description')}
                        includeBlock
                    />
                </SectionBlock>
            </Section>
        );
    }
}

export default withTranslation('landing')(MapSection);

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
