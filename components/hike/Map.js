import React from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import polyline from 'google-polyline';
import buildUrl from 'build-url';
import { Card } from '../../styles/card';
import { device } from '../../constants/breakpoints';
import colors from '../../constants/colors';
import { SecondaryHeading } from '../../styles/headings';
import { getHikeXmlUrl, parseHikeXml } from '../../utils/hike';

const mapApiKey = 'AIzaSyDNvaSlj_yrjkhClop5dPBDPSNUjOUS_a8';
const mapStaticApiKey = 'AIzaSyDzhRGewrBXqU6XPG5Bdl29JpPRPNtdilY';

const propTypes = {
    mapOptions: PropTypes.object,
    pathOptions: PropTypes.object,
    id: PropTypes.string.isRequired,
    zoom: PropTypes.number,
};

const defaultProps = {
    mapOptions: {
        panControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: 'terrain',
    },
    pathOptions: {
        strokeWeight: 4,
        strokeOpacity: 0.9,
        strokeColor: colors.purple,
    },
    zoom: 12,
};

class HikeMap extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            path: [],
            center: null,
        };
    }

    async componentDidMount() {
        await this.initializeMap();
    }

    setMapCenter() {
        const { centerLat, centerLng } = this.state;
        const center = {
            lat: centerLat,
            lng: centerLng,
        };

        if (center) {
            this.setState({ center });
        }
    }

    getHikeData = async () => {
        const { id } = this.props;
        const hikeXmlUrl = await getHikeXmlUrl(id);
        const hikeData = await parseHikeXml(hikeXmlUrl);

        if (hikeData) {
            this.setHikeData(hikeData);
            this.createPath();
            this.setMapCenter();
            this.parseCoordinates();
        }
    };

    setHikeData(hikeData) {
        const hikeMetaData = hikeData.gpx.metadata[0].bounds[0].$;
        const { maxlat, minlat, minlon, maxlon } = hikeMetaData;

        this.setState({
            centerLat: (parseFloat(maxlat) + parseFloat(minlat)) / 2,
            centerLng: (parseFloat(maxlon) + parseFloat(minlon)) / 2,
            hikeData,
        });
    }

    initializeMap = async () => {
        this.getHikeData();
    };

    parseCoordinates() {
        const { hikeData } = this.state;
        const coordinateCount = hikeData.gpx.rte[0].rtept.length;
        const path = [];

        for (let i = 0, len = coordinateCount; i < len; i += 1) {
            const coordinate = hikeData.gpx.rte[0].rtept[i].$;
            path.push({
                lat: parseFloat(coordinate.lat),
                lng: parseFloat(coordinate.lon),
            });
        }

        this.setState({ path });
    }

    createPath() {
        const { hikeData, centerLat, centerLng } = this.state;
        const coordinateCount = hikeData.gpx.rte[0].rtept.length;
        const path = [];

        for (let i = 0, len = coordinateCount; i < len; i += 1) {
            const coordinate = hikeData.gpx.rte[0].rtept[i].$;
            path.push([parseFloat(coordinate.lat), parseFloat(coordinate.lon)]);
        }

        const encodedPolyline = polyline.encode(path);
        const mapPath = `color:0x935DFFFF|weight:4|enc:${encodedPolyline}`;

        const mapUrl = buildUrl(
            'https://maps.googleapis.com/maps/api/staticmap',
            {
                queryParams: {
                    size: '400x400',
                    maptype: 'terrain',
                    center: `${centerLat},${centerLng}`,
                    path: mapPath,
                    key: mapStaticApiKey,
                },
            },
        );

        console.log(mapUrl);
    }

    renderEmptyState = () => {
        return <MapEmptyState />;
    };

    render() {
        const { path, center } = this.state;
        const { mapOptions, pathOptions, zoom } = this.props;

        return (
            <Card noPadding>
                <SecondaryHeading isCard>Trail Map</SecondaryHeading>
                <LoadScript
                    googleMapsApiKey={mapApiKey}
                    loadingElement={this.renderEmptyState()}
                >
                    <MapContainer>
                        <GoogleMap
                            mapContainerClassName='hikeMap'
                            options={mapOptions}
                            center={center}
                            zoom={zoom}
                        >
                            <Polyline path={path} options={pathOptions} />
                        </GoogleMap>
                    </MapContainer>
                </LoadScript>
            </Card>
        );
    }
}

HikeMap.propTypes = propTypes;
HikeMap.defaultProps = defaultProps;

export default HikeMap;

const mapStyle = `
    border-top: 1px solid ${colors.gray};
    height: 350px;
    width: 100%;

    @media ${device.tablet} {
        border-top: 3px solid ${colors.grayLight};
        height: 250px;
    }
`;

const MapEmptyState = styled.div`
    ${mapStyle};
`;

const MapContainer = styled.div`
    .hikeMap {
        ${mapStyle};
    }
`;
