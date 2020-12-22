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
import { getHikeData, getMapImage } from '../../../utils/hike';

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
        const mapImage = await getMapImage(query.id);

        hike.mapImage = mapImage;
        hike.id = query.id;

        return {
            hike,
            id: query.id,
            namespacesRequired: [
                'common',
                'action',
                'hike',
                'header',
                'footer',
            ],
        };
    }

    renderMainColumn() {
        const { hike, id } = this.props;

        return (
            <div>
                <Header name={hike.name} city={hike.city} state={hike.state} />
                <HikeMap id={id} hike={hike} />
                <ActionBar hike={hike} />
                <Description description={hike.description} key={id} />
                <Gallery id={id} />
            </div>
        );
    }

    renderStickyRightColumn() {
        const { hike, shouldShowAd } = this.props;

        return (
            <div>
                <RecentHikes id={hike.id} />
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
