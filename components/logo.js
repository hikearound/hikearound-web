import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { device } from '../constants/breakpoints';

class Logo extends React.PureComponent {
    render() {
        return (
            <Link href='/'>
                <LogoImage src='/images/logo.svg' alt='Hikearound logo' />
            </Link>
        );
    }
}

export default Logo;

const LogoImage = styled.img`
    height: 20px;
    width: 166px;
    position: relative;
    top: -1px;

    &:hover {
        cursor: pointer;
    }

    @media ${device.tablet} {
        margin: 0 auto;
    }
`;
