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

const phone = require('../../../public/images/landing/02.png');
const phoneOptimized = require('../../../public/images/landing/02.png?webp');

class MapSection extends React.PureComponent {
    renderPhone = () => {
        const { t } = this.props;

        return (
            <ContentImage justifyLeft>
                <picture>
                    <source srcSet={phoneOptimized} type='image/webp' />
                    <source srcSet={phone} type='image/png' />
                    <Phone
                        src={phone}
                        alt={t('image.alt.phone', {
                            appName: t('common:appName'),
                        })}
                    />
                </picture>
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

export default withTranslation(['landing', 'common'])(MapSection);

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
