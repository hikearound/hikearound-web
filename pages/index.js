import React from 'react';
import styled from 'styled-components';
import Page from '../layouts/main';
import Logo from '../components/logo';

class HomePage extends React.PureComponent {
    render() {
        return (
            <Page>
                <RootView>
                    <Logo />
                </RootView>
            </Page>
        );
    }
}

export default HomePage;

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
