import React from 'react';
import styled from 'styled-components';

class Logo extends React.PureComponent {
    render() {
        return <LogoImage src='/images/logo.svg' alt='Hikearound logo' />;
    }
}

export default Logo;

const LogoImage = styled.img`
    height: 20px;
    width: 166px;
    position: relative;
    top: -1px;
`;
