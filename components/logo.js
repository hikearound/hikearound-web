import React from 'react';
import styled from 'styled-components';

const Logo = () => <LogoImage src='/images/logo.svg' alt='Hikearound logo' />;

export default Logo;

const LogoImage = styled.img`
    height: 125px;
    width: 125px;
`;
