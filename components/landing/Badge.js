import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
import { componentSpacing } from '../../constants/landing';
import { appStoreUrl } from '../../constants/common';

const propTypes = {
    includeTopMargin: PropTypes.bool,
};

const defaultProps = {
    includeTopMargin: true,
};

class AppStoreBadge extends React.PureComponent {
    getSrc = () => {
        const { i18n } = this.props;
        return `/images/external/${i18n.language}/app-store-badge.svg`;
    };

    render() {
        const { t, includeTopMargin } = this.props;

        return (
            <Link
                href={appStoreUrl}
                target='_blank'
                rel='noreferrer'
                includeTopMargin={includeTopMargin}
            >
                <ImageWrapper>
                    <Image
                        src={this.getSrc()}
                        alt={t('image.alt.badge')}
                        width={125}
                        height={42}
                        unoptimized
                        priority
                    />
                </ImageWrapper>
            </Link>
        );
    }
}

export default withTranslation('landing')(AppStoreBadge);

AppStoreBadge.propTypes = propTypes;
AppStoreBadge.defaultProps = defaultProps;

export const Link = styled.a`
    display: inline-block;
    margin-top: ${componentSpacing.sm};
    margin-top: ${(props) =>
        props.includeTopMargin ? componentSpacing.sm : 0};
    width: 125px;
    min-height: 42px;
`;

export const ImageWrapper = styled.div`
    color: transparent;
`;
