import React from 'react';
import styled from 'styled-components';
import { componentSpacing } from '../../constants/landing';
import { withTranslation } from '../../utils/i18n';

class AppStoreBadge extends React.PureComponent {
    render() {
        const { t } = this.props;

        return (
            <Link href='/' target='_blank' rel='noreferrer'>
                <Badge
                    src='/images/external/app-store-badge.svg'
                    alt={t('image.alt.badge')}
                />
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

export const Badge = styled.img`
    width: 125px;
    color: transparent;
`;
