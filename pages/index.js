import React from 'react';
import styled from 'styled-components';
import Page from '../layouts/main';
import Logo from '../components/logo';

function Index() {
    return (
        <Page>
            <RootView>
                <Logo />
            </RootView>
        </Page>
    );
}

export default Index;

const RootView = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0 auto;

    img {
        margin: 0 auto;
    }
`;
