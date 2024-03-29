import React from 'react';
import styled from 'styled-components';
import { withTranslation } from 'next-i18next';
import Image from 'next/image';
import { Section, SectionBlock, ContentImage } from '@styles/landing';
import TextSection from '@components/landing/Text';
import AppStoreBadge from '@components/landing/Badge';
import { device } from '@constants/breakpoints';
import { spacing } from '@constants/spacing';
import { landing } from '@constants/images';

class IntroSection extends React.PureComponent {
    renderBadge = () => <AppStoreBadge />;

    getSrc = () => {
        const { i18n } = this.props;
        return landing.phone[i18n.language].hike;
    };

    renderPhone = () => {
        const { t } = this.props;

        return (
            <ContentImage inflate>
                <ImageWrapper>
                    <Image
                        src={this.getSrc()}
                        alt={t('image.alt.phone', {
                            appName: t('common:appName'),
                        })}
                        width={584}
                        height={588}
                        placeholder='blur'
                        blurDataURL={landing.phone.blur.hike}
                        priority
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
                        includeMaxWidth
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
    margin-right: -145px;

    @media ${device.tablet} {
        width: 100%;
        height: 100%;
        margin-right: 0;
        margin-bottom: 25px;
        left: 15px;
        top: 0;
    }
`;
