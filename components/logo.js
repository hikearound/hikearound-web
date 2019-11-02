import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
    dimension: PropTypes.number,
};

const defaultProps = {
    dimension: 125,
};

const Logo = ({ dimension }) => (
    <LogoImage
        dimension={dimension}
        src='/images/logo.svg'
        alt='Hikearound logo'
    />
);

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;

const LogoImage = styled.img`
    height: ${(props) => props.dimension}px;
    width: ${(props) => props.dimension}px;
`;
