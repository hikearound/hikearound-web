import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../../layouts/main';
import Header from '../../../components/hike/Header';
import RecentHikes from '../../../components/RecentHikes';
import { getHikeData } from '../../../utils/hike';

const propTypes = {
    hike: PropTypes.object.isRequired,
};

class HikePage extends React.Component {
    static async getInitialProps({ query }) {
        const hike = await getHikeData(query.id);
        return { hike };
    }

    renderMainColumn() {
        const { hike } = this.props;
        return <Header name={hike.name} city={hike.city} />;
    }

    renderRightColumn() {
        const { hike } = this.props;
        return <RecentHikes id={hike.id} />;
    }

    render() {
        return (
            <Page
                mainColumn={this.renderMainColumn()}
                rightColumn={this.renderRightColumn()}
            />
        );
    }
}

HikePage.propTypes = propTypes;

export default HikePage;
