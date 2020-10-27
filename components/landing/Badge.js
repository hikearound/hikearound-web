import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { componentSpacing } from '../../constants/landing';
import { withTranslation } from '../../utils/i18n';

class AppStoreBadge extends React.PureComponent {
    render() {
        const { t } = this.props;

        return (
            <Link href='/' target='_blank' rel='noreferrer'>
                <ImageWrapper>
                    <Image
                        src='/images/external/app-store-badge.svg'
                        priority
                        alt={t('image.alt.badge')}
                        width={125}
                        height={42}
                    />
                </ImageWrapper>
            </Link>
        );
    }
}

export default withTranslation('landing')(AppStoreBadge);

export const Link = styled.a`
    display: inline-block;
    margin-top: ${componentSpacing.sm};
    width: 125px;
    min-height: 42px;
`;

export const ImageWrapper = styled.div`
    color: transparent;
`;
