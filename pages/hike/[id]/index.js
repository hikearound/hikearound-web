import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import firebase from '@firebase/app';
import Page from '../../../layouts/main';

const propTypes = {
    hike: PropTypes.object.isRequired,
};

class HikePage extends React.Component {
    static async getInitialProps({ query }) {
        let hike = {};

        if (query.id) {
            const hikeData = await firebase
                .firestore()
                .collection('hikes')
                .doc(query.id)
                .get();
            hike = hikeData.data();
        }
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
