import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import { fontSize, fontWeight } from '../../constants/type';
import { borderRadius } from '../../constants/dimensions';

const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
};

class Header extends React.PureComponent {
    render() {
        const { name, city } = this.props;

        return (
            <HeaderRoot>
                <HikeName>{name}</HikeName>
                <HikeCity>{city}</HikeCity>
            </HeaderRoot>
        );
    }
}

Header.propTypes = propTypes;

export default Header;

const HikeName = styled.div`
    font-size: ${fontSize.xl};
    font-weight: ${fontWeight.medium};
`;

const HikeCity = styled.div`
    font-size: ${fontSize.md};
    margin-top: ${spacing.xs};
    font-weight: ${fontWeight.regular};
    color: ${colors.grayDark};
`;
const HeaderRoot = styled.div`
    background-color: ${colors.white};
    border: 1px solid ${colors.gray};
    border-radius: ${borderRadius.sm};
    padding: ${spacing.md};
`;
