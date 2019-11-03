import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import firebase from '@firebase/app';
import Page from '../layouts/main';
import '@firebase/firestore';

const propTypes = {
    hike: PropTypes.object.isRequired,
};

class HikePage extends React.PureComponent {
    static async getInitialProps({ query }) {
        const hikeId = query.id;

        const hikeData = await firebase
            .firestore()
            .collection('hikes')
            .doc(hikeId)
            .get();

        const hike = hikeData.data();

        return { hike };
    }

    render() {
        const { hike } = this.props;

        return (
            <Page>
                <RootView>{hike.name}</RootView>
            </Page>
        );
    }
}

HikePage.propTypes = propTypes;

export default HikePage;

const RootView = styled.div`
    display: flex;
`;
