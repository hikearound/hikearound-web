import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';
import { grid } from '../constants/dimensions';
import Logo from './Logo';
import GlobalNav from './GlobalNav';
import { device } from '../constants/breakpoints';

class GlobalHeader extends React.PureComponent {
    render() {
        return (
            <HeaderContainer>
                <HeaderInterior>
                    <Logo />
                    <GlobalNav />
                </HeaderInterior>
            </HeaderContainer>
        );
    }
}

export default GlobalHeader;

const HeaderContainer = styled.div`
    height: ${grid.header};
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${colors.purple};
    margin-bottom: ${grid.gutter};
    padding: 0 ${grid.gutter};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    @media ${device.tablet} {
        margin-bottom: 0;
    }
`;

const HeaderInterior = styled.div`
    width: 100%;
    max-width: ${grid.main};
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
