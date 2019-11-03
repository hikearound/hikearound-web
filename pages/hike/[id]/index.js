import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import firebase from '@firebase/app';
import Page from '../../../layouts/main';

const propTypes = {
    hike: PropTypes.object.isRequired,
};

function HikePage({ hike }) {
    return (
        <Page>
            <RootView>{hike.name}</RootView>
        </Page>
    );
}

HikePage.getInitialProps = async function({ query }) {
    const hikeId = query.id;

    const hikeData = await firebase
        .firestore()
        .collection('hikes')
        .doc(hikeId)
        .get();

    const hike = hikeData.data();

    return { hike };
};

HikePage.propTypes = propTypes;

export default HikePage;

const RootView = styled.div`
    display: flex;
`;
