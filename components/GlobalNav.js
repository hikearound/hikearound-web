import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import { fontSize } from '../constants/type';

class GlobalNav extends React.PureComponent {
    render() {
        return (
            <LinkContainer>
                <Link href='/about'>
                    <GlobalLink>About</GlobalLink>
                </Link>
                <GlobalLink href='#'>Get the App</GlobalLink>
            </LinkContainer>
        );
    }
}

export default GlobalNav;

const LinkContainer = styled.div`
    display: inline;
`;

const GlobalLink = styled.a`
    color: ${colors.white};
    cursor: pointer;
    text-decoration: none;
    margin-left: ${spacing.md};
    font-size: ${fontSize.md};

    &:hover {
        text-decoration: underline;
    }
`;
