import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../../layouts/main';
import Header from '../../../components/hike/Header';
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
                <Header name={hike.name} city={hike.city} />
            </Page>
        );
    }
}

HikePage.propTypes = propTypes;

export default HikePage;
