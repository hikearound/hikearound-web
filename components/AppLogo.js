import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '../utils/i18n';
import { device } from '../constants/breakpoints';

const white = require('../public/images/logo/logo.svg?include');
const purple = require('../public/images/logo/logo-purple.svg?include');

const propTypes = {
    invertHeader: PropTypes.bool.isRequired,
    alt: PropTypes.string.isRequired,
};

class AppLogo extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        const { invertHeader } = this.props;

        let logo = white;
        if (invertHeader) {
            logo = purple;
        }

        this.state = { logo };
    }

    render() {
        const { logo } = this.state;
        const { alt } = this.props;

        return (
            <Link href='/'>
                <LogoLink href='/'>
                    <LogoImage
                        dangerouslySetInnerHTML={{
                            __html: logo,
                        }}
                        alt={alt}
                    />
                </LogoLink>
            </Link>
        );
    }
}

AppLogo.propTypes = propTypes;

export default AppLogo;

const LogoLink = styled.a`
    @media ${device.tablet} {
        margin: 0 auto;
    }
`;

const LogoImage = styled.div`
    height: 20px;
    width: 166px;
    position: relative;
    top: -1px;
    color: transparent;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.9;
    }
`;
