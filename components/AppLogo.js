import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { device } from '../constants/breakpoints';

const propTypes = {
    invertHeader: PropTypes.bool.isRequired,
};

class AppLogo extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        const { invertHeader } = this.props;

        let logo = '/images/logo/logo.svg';
        if (invertHeader) {
            logo = '/images/logo/logo-purple.svg';
        }

        this.state = { logo };
    }

    render() {
        const { logo } = this.state;

        return (
            <Link href='/'>
                <LogoLink href='/'>
                    <LogoImage src={logo} />
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

const LogoImage = styled.img`
    height: 20px;
    width: 166px;
    position: relative;
    top: -1px;

    &:hover {
        cursor: pointer;
    }
`;
