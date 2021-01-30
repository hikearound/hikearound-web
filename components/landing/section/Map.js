import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Section, SectionBlock, ContentImage } from '../../../styles/landing';
import TextSection from '../Text';
import { device } from '../../../constants/breakpoints';
import { withTranslation } from '../../../utils/i18n';

class MapSection extends React.PureComponent {
    renderPhone = () => {
        const { t } = this.props;

        return (
            <ContentImage justifyLeft>
                <ImageWrapper>
                    <Image
                        src='/images/landing/02b.png'
                        alt={t('image.alt.phone', {
                            appName: t('common:appName'),
                        })}
                        width={358}
                        height={620}
                        loading='eager'
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
    margin-bottom: 120px;

    @media ${device.tablet} {
        top: 0;
        margin: 0 auto 10px auto;
    }
`;
