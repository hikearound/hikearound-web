import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { device } from '../constants/breakpoints';

const propTypes = {
    alt: PropTypes.string.isRequired,
};

class AppLogo extends React.PureComponent {
    render() {
        const { alt } = this.props;

        return (
            <Link href='/' passHref>
                <LogoLink href='/' aria-label={alt}>
                    <ImageWrapper>
                        <Image
                            src='/images/logo/logo.svg'
                            priority
                            alt={alt}
                            width={166}
                            height={20}
                            unoptimized
                        />
                    </ImageWrapper>
                </LogoLink>
            </Link>
        );
    }
}

AppLogo.propTypes = propTypes;

export default AppLogo;

const LogoLink = styled.a`
    display: flex;
    align-items: center;

    @media ${device.tablet} {
        margin: 0 auto;
    }
`;

const ImageWrapper = styled.div`
    color: transparent;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.9;
    }
`;
