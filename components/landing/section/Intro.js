import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Section, SectionBlock, ContentImage } from '../../../styles/landing';
import TextSection from '../Text';
import AppStoreBadge from '../Badge';
import { device } from '../../../constants/breakpoints';
import { spacing } from '../../../constants/spacing';
import { withTranslation } from '../../../utils/i18n';

class IntroSection extends React.PureComponent {
    renderBadge = () => {
        return <AppStoreBadge />;
    };

    renderPhone = () => {
        const { t } = this.props;

        return (
            <ContentImage inflate>
                <ImageWrapper>
                    <Image
                        src='/images/landing/01b.png'
                        alt={t('image.alt.phone', {
                            appName: t('common:appName'),
                        })}
                        width={634}
                        height={620}
                        priority
                        quality={100}
                    />
                </ImageWrapper>
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

export const ImageWrapper = styled.div`
    color: transparent;
    position: relative;
    top: ${spacing.md};
    margin-right: -160px;

    @media ${device.tablet} {
        width: 105%;
        height: 100%;
        margin-right: 0;
        margin-bottom: 0;
        left: 20px;
        top: 0;
    }
`;
