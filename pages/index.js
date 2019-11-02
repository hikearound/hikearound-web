import React from 'react';
import styled from 'styled-components';
import Page from '../layouts/main';
import Logo from '../components/logo';
import colors from '../styles/colors';
import { fontSize, typeface } from '../styles/type';
import spacing from '../styles/spacing';

const logoDimension = '125px';

function Index() {
    return (
        <Page>
            <RootView>
                <Logo />
                <HeaderText>Hikearound is coming soon</HeaderText>
            </RootView>
        </Page>
    );
}

export default Index;

const HeaderText = styled.span`
    font-size: ${fontSize.md};
    color: ${colors.blackText};
    display: block;
    margin: ${spacing.sm} auto 0;
`;

const RootView = styled.div`
    font-family: ${typeface.sansSerif};
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0 auto;

    img {
        margin: 0 auto;
        width: ${logoDimension};
        height: ${logoDimension};
    }
`;
