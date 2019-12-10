import React from 'react';
import styled from 'styled-components';
import { device } from '../constants/breakpoints';

class AppLogo extends React.PureComponent {
    render() {
        return <LogoImage src='/images/logo.svg' alt='Hikearound logo' />;
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
