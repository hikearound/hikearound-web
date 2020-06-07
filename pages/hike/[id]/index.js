import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../../layouts/main';
import Header from '../../../components/hike/Header';
import Description from '../../../components/hike/Description';
import Stats from '../../../components/hike/Stats';
import Gallery from '../../../components/hike/Gallery';
import HikeMap from '../../../components/hike/Map';
import RecentHikes from '../../../components/RecentHikes';
import ActionBar from '../../../components/action_bar/Hike';
import Ad from '../../../components/page/Ad';
import {
    getHikeData,
    getHikeImageGallery,
    getMapImage,
} from '../../../utils/hike';

const propTypes = {
    hike: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    shouldShowAd: PropTypes.bool,
    images: PropTypes.object,
};

const defaultProps = {
    shouldShowAd: true,
    images: {},
};

class HikePage extends React.Component {
    static async getInitialProps({ query }) {
        const hike = await getHikeData(query.id);
        const images = await getHikeImageGallery(query.id);
        const mapImage = await getMapImage(query.id);

        hike.mapImage = mapImage;
        hike.id = query.id;

        return { hike, images, id: query.id };
    }

    renderMainColumn() {
        const { hike, id, images } = this.props;

        return (
            <div>
                <Header name={hike.name} city={hike.city} />
                <HikeMap id={id} />
                <ActionBar />
                <Description description={hike.description} />
                <Gallery id={id} images={images} />
            </div>
        );
    }

    renderRightColumn() {
        const { hike, shouldShowAd } = this.props;

        return (
            <div>
                <Stats hike={hike} />
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
                hike={hike}
                mainColumn={this.renderMainColumn()}
                rightColumn={this.renderRightColumn()}
            />
        );
    }
}

HikePage.propTypes = propTypes;
HikePage.defaultProps = defaultProps;

export default HikePage;
