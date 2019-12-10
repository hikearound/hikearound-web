import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { device } from '../constants/breakpoints';

class AppLogo extends React.PureComponent {
    render() {
        return (
            <Link href='/'>
                <a href='/'>
                    <LogoImage src='/images/logo.svg' alt='Hikearound logo' />
                </a>
            </Link>
        );
    }
}

export default AppLogo;

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
