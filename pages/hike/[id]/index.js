import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../../layouts/main';
import Header from '../../../components/hike/Header';
import HikeMap from '../../../components/hike/Map';
import RecentHikes from '../../../components/RecentHikes';
import { getHikeData } from '../../../utils/hike';

const propTypes = {
    hike: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

class HikePage extends React.Component {
    static async getInitialProps({ query }) {
        const hike = await getHikeData(query.id);
        return {
            hike,
            id: query.id,
        };
    }

    renderMainColumn() {
        const { hike, id } = this.props;
        return (
            <div>
                <Header name={hike.name} city={hike.city} />
                <HikeMap id={id} />
            </div>
        );
    }

    renderRightColumn() {
        const { hike } = this.props;
        return <RecentHikes id={hike.id} />;
    }

    render() {
        const { hike } = this.props;

        return (
            <Page
                title={hike.name}
                mainColumn={this.renderMainColumn()}
                rightColumn={this.renderRightColumn()}
            />
        );
    }
}

HikePage.propTypes = propTypes;

export default HikePage;
