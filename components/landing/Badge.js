import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { componentSpacing } from '../../constants/landing';
import { withTranslation } from '../../utils/i18n';

const propTypes = {
    includeTopMargin: PropTypes.bool,
};

const defaultProps = {
    includeTopMargin: true,
};

class AppStoreBadge extends React.PureComponent {
    render() {
        const { t, includeTopMargin } = this.props;

        return (
            <Link
                href='/'
                target='_blank'
                rel='noreferrer'
                includeTopMargin={includeTopMargin}
            >
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
