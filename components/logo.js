import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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
`;
