import React from 'react';
import styled from 'styled-components';
import { withTranslation } from 'next-i18next';
import Image from 'next/image';
import { Section, SectionBlock, ContentImage } from '../../../styles/landing';
import TextSection from '../Text';
import { device } from '../../../constants/breakpoints';
import { landing } from '../../../constants/images';

class MapSection extends React.PureComponent {
    getSrc = () => {
        const { i18n } = this.props;
        return landing.phone[i18n.language].map;
    };

    renderPhone = () => {
        const { t } = this.props;

        return (
            <ContentImage justifyLeft>
                <ImageWrapper>
                    <Image
                        src={this.getSrc()}
                        alt={t('image.alt.phone', {
                            appName: t('common:appName'),
                        })}
                        width={351}
                        height={620}
                        placeholder='blur'
                        blurDataURL={landing.phone.blur.hike}
                    />
                </ImageWrapper>
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

export const ImageWrapper = styled.div`
    color: transparent;
    position: relative;
    top: 80px;
    margin-bottom: 130px;

    @media ${device.tablet} {
        top: 0;
        margin: 0 auto 20px auto;
    }
`;
