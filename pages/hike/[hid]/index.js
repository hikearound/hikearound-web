import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../../layouts/main';
import Header from '../../../components/hike/Header';
import Description from '../../../components/hike/Description';
import Stats from '../../../components/hike/Stats';
import Gallery from '../../../components/hike/Gallery';
import HikeMap from '../../../components/hike/Map';
import Reviews from '../../../components/hike/Reviews';
import NearbyHikes from '../../../components/NearbyHikes';
import ActionBar from '../../../components/action_bar/Hike';
import Ad from '../../../components/page/Ad';
import { getHikeData, getMapImage } from '../../../utils/hike';

const propTypes = {
    hike: PropTypes.object.isRequired,
    hid: PropTypes.string.isRequired,
    shouldShowAd: PropTypes.bool,
};

const defaultProps = {
    shouldShowAd: true,
};

class HikePage extends React.Component {
    static async getInitialProps({ query }) {
        const { hid } = query;
        const hike = await getHikeData(hid);
        const mapImage = await getMapImage(hid);

        hike.mapImage = mapImage;
        hike.hid = hid;

        return {
            hike,
            hid,
            namespacesRequired: [
                'common',
                'action',
                'hike',
                'user',
                'header',
                'footer',
            ],
        };
    }

    renderMainColumn() {
        const { hike, hid } = this.props;

        return (
            <div>
                <Header name={hike.name} city={hike.city} state={hike.state} />
                <HikeMap hid={hid} hike={hike} />
                <ActionBar hike={hike} />
                <Description description={hike.description} key={hid} />
                <Gallery hid={hid} />
                <Reviews hid={hid} />
            </div>
        );
    }

    renderStickyRightColumn() {
        const { hike, shouldShowAd } = this.props;

        return (
            <div>
                <NearbyHikes
                    location={hike.coordinates.center}
                    city={hike.city}
                />
                {shouldShowAd && <Ad />}
            </div>
        );
    }

    renderRightColumn() {
        const { hike } = this.props;

        return <Stats hike={hike} />;
    }

    render() {
        const { hike } = this.props;

        return (
            <Page
                title={hike.name}
                hike={hike}
                mainColumn={this.renderMainColumn()}
                rightColumnSticky={this.renderStickyRightColumn()}
                rightColumn={this.renderRightColumn()}
            />
        );
    }
}

HikePage.propTypes = propTypes;
HikePage.defaultProps = defaultProps;

export default HikePage;
