import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../../layouts/main';
import Header from '../../../components/hike/Header';
import Description from '../../../components/hike/Description';
import Gallery from '../../../components/hike/Gallery';
import HikeMap from '../../../components/hike/Map';
import RecentHikes from '../../../components/RecentHikes';
import Ad from '../../../components/page/Ad';
import { getHikeData } from '../../../utils/hike';

const propTypes = {
    hike: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    shouldShowAd: PropTypes.bool,
};

const defaultProps = {
    shouldShowAd: true,
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
                <Gallery id={id} images={hike.images} />
                <Description description={hike.description} />
            </div>
        );
    }

    renderRightColumn() {
        const { hike, shouldShowAd } = this.props;

        return (
            <div>
                <RecentHikes id={hike.id} />
                {shouldShowAd && <Ad />}
            </div>
        );
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
HikePage.defaultProps = defaultProps;

export default HikePage;
