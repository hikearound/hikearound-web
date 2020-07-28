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

const phoneImage = require('../../../public/images/landing/01.webp');

class IntroSection extends React.PureComponent {
    renderBadge = () => {
        return <AppStoreBadge />;
    };

    renderPhone = () => {
        const { t } = this.props;

        return (
            <ContentImage inflate>
                <Phone
                    src={phoneImage}
                    alt={t('image.alt.phone', { appName: t('common:appName') })}
                />
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

export default withTranslation(['landing', 'common'])(IntroSection);

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
