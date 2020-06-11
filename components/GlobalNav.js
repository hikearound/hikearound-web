import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { colors } from '../constants/colors';
import spacing from '../constants/spacing';
import { fontSize } from '../constants/type';
import { device } from '../constants/breakpoints';

const propTypes = {
    invertHeader: PropTypes.bool.isRequired,
};

class GlobalNav extends React.PureComponent {
    render() {
        const { invertHeader } = this.props;

        return (
            <LinkContainer>
                <Link href='/about'>
                    <GlobalLink href='/about' invertHeader={invertHeader}>
                        About
                    </GlobalLink>
                </Link>
                <GlobalLink href='/' invertHeader={invertHeader}>
                    Get the App
                </GlobalLink>
            </LinkContainer>
        );
    }
}

GlobalNav.propTypes = propTypes;

export default GlobalNav;

const LinkContainer = styled.div`
    display: inline;
    margin: auto 0;
`;

const GlobalLink = styled.a`
    color: ${(props) => (props.invertHeader ? colors.grayDark : colors.white)};
    cursor: pointer;
    text-decoration: none;
    margin-left: ${spacing.md};
    font-size: ${fontSize.md};

    &:hover {
        text-decoration: underline;
    }

    @media ${device.tablet} {
        display: none;
    }
`;
