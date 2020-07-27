import React from 'react';
import styled from 'styled-components';
import {
    Section,
    SectionBlock,
    ContentImage,
    PhoneBase,
} from '../../../styles/landing';
import TextSection from '../Text';
import AppStoreBadge from '../Badge';
import { device } from '../../../constants/breakpoints';
import { spacing } from '../../../constants/spacing';
import { componentSpacing } from '../../../constants/landing';
import { withTranslation } from '../../../utils/i18n';

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
        const { t } = this.props;

        return (
            <Section>
                <SectionBlock direction='column'>
                    <TextSection
                        title={t('section.intro.title')}
                        description={t('section.intro.description')}
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

export default withTranslation('landing')(IntroSection);

export const Phone = styled(PhoneBase)`
    max-width: 600px;
    margin-right: -120px;
    position: relative;
    top: ${spacing.md};
    margin-bottom: ${componentSpacing.md};

    @media ${device.tablet} {
        margin-right: 0;
        left: ${spacing.xs};
        top: 0;
    }
`;
