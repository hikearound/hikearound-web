import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';
import { grid } from '../constants/dimensions';
import Logo from './Logo';
import GlobalNav from './GlobalNav';

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
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${colors.purple};
    margin-bottom: 30px;
`;

const HeaderInterior = styled.div`
    width: ${grid.main};
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
