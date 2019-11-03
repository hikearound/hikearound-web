import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import firebase from '@firebase/app';
import Page from '../layouts/main';
import Logo from '../components/logo';
import '@firebase/firestore';

const propTypes = {
    hike: PropTypes.object.isRequired,
};

class Index extends React.PureComponent {
    render() {
        const { hike } = this.props;

        return (
            <Page>
                <RootView>
                    <Logo />
                    {hike.name}
                </RootView>
            </Page>
        );
    }
}

Index.getInitialProps = async function() {
    const hikeData = await firebase
        .firestore()
        .collection('hikes')
        .doc('zvXj5WRBdxrlRTLm65SD')
        .get();

    return {
        hike: hikeData.data(),
    };
};

Index.propTypes = propTypes;

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
