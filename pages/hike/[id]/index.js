import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Page from '../../../layouts/main';
import { getHikeData } from '../../../utils/hike';

const propTypes = {
    hike: PropTypes.object.isRequired,
};

class HikePage extends React.Component {
    static async getInitialProps({ query }) {
        const hike = await getHikeData(query.id);
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
