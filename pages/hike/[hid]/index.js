import React from 'react';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../../../layouts/main';
import Header from '../../../components/hike/Header';
import Description from '../../../components/hike/Description';
import Stats from '../../../components/hike/Stats';
import Gallery from '../../../components/hike/Gallery';
import HikeMap from '../../../components/hike/Map';
import Reviews from '../../../components/hike/Reviews';
import ReviewPrompt from '../../../components/hike/ReviewPrompt';
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
    shouldShowAd: false,
};

const HikePage = ({ hike, hid, shouldShowAd }) => {
    hike = JSON.parse(hike);

    const renderMainColumn = () => {
        return (
            <div>
                <Header name={hike.name} city={hike.city} state={hike.state} />
                <HikeMap hid={hid} hike={hike} />
                <ActionBar hike={hike} />
                <Description description={hike.description} key={hid} />
                <Gallery hid={hid} />
                <ReviewPrompt />
                <Reviews hid={hid} />
            </div>
        );
    };

    const renderStickyRightColumn = () => {
        return (
            <div>
                <NearbyHikes
                    hid={hid}
                    location={hike.coordinates.center}
                    city={hike.city}
                />
                {shouldShowAd && <Ad />}
            </div>
        );
    };

    const renderRightColumn = () => {
        return <Stats hike={hike} />;
    };

    return (
        <Page
            title={hike.name}
            hike={hike}
            mainColumn={renderMainColumn()}
            rightColumnSticky={renderStickyRightColumn()}
            rightColumn={renderRightColumn()}
        />
    );
};

export async function getServerSideProps({ query, locale }) {
    const { hid } = query;
    const hike = await getHikeData(hid);
    const mapImage = await getMapImage(hid);

    hike.mapImage = mapImage;
    hike.hid = hid;

    return {
        props: {
            hid,
            hike: JSON.stringify(hike),
            ...(await serverSideTranslations(locale, [
                'common',
                'action',
                'hike',
                'user',
                'header',
                'footer',
            ])),
        },
    };
}

HikePage.propTypes = propTypes;
HikePage.defaultProps = defaultProps;

export default HikePage;
