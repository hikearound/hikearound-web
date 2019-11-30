import React from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { parseString } from 'xml2js';
import { Card } from '../../styles/card';
import { device } from '../../constants/breakpoints';
import colors from '../../constants/colors';
import { SecondaryHeading } from '../../styles/headings';
import { getHikeXmlUrl } from '../../utils/hike';

const mapApiKey = 'AIzaSyDNvaSlj_yrjkhClop5dPBDPSNUjOUS_a8';

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
            coordinates: null,
            center: null,
        };
    }

    async componentDidMount() {
        await this.initializeMap();
    }

    setMapCenter() {
        const { lat, lng } = this.state;
        const center = { lat, lng };

        if (center) {
            this.setState({ center });
        }
    }

    getHikeData = async () => {
        const { id } = this.props;
        const hikeXmlUrl = await getHikeXmlUrl(id);

        await fetch(hikeXmlUrl)
            .then((response) => response.text())
            .then((response) => {
                parseString(response, (err, result) => {
                    const hikeData = JSON.stringify(result);
                    this.setHikeData(JSON.parse(hikeData));
                });
            });

        this.parseCoordinates();
        this.setMapCenter();
    };

    setHikeData(hikeData) {
        const hikeMetaData = hikeData.gpx.metadata[0].bounds[0].$;
        const maxlat = parseFloat(hikeMetaData.maxlat);
        const minlat = parseFloat(hikeMetaData.minlat);
        const minlon = parseFloat(hikeMetaData.minlon);
        const maxlon = parseFloat(hikeMetaData.maxlon);

        this.setState({
            lat: (maxlat + minlat) / 2,
            lng: (maxlon + minlon) / 2,
            hikeData,
        });
    }

    initializeMap = async () => {
        this.getHikeData();
    };

    parseCoordinates() {
        const { hikeData } = this.state;
        const coordinates = [];
        const coordinateCount = hikeData.gpx.rte[0].rtept.length;

        for (let i = 0, len = coordinateCount; i < len; i += 1) {
            const coordinate = hikeData.gpx.rte[0].rtept[i].$;
            coordinates.push({
                lat: parseFloat(coordinate.lat),
                lng: parseFloat(coordinate.lon),
            });
        }

        this.setState({ coordinates });
    }

    render() {
        const { coordinates, center } = this.state;
        const { mapOptions, pathOptions, zoom } = this.props;

        return (
            <Card noPadding>
                <SecondaryHeading isCard>Trail Map</SecondaryHeading>
                {coordinates && center && (
                    <LoadScript googleMapsApiKey={mapApiKey}>
                        <MapContainer>
                            <GoogleMap
                                mapContainerClassName='hikeMap'
                                options={mapOptions}
                                center={center}
                                zoom={zoom}
                            >
                                <Polyline
                                    path={coordinates}
                                    options={pathOptions}
                                />
                            </GoogleMap>
                        </MapContainer>
                    </LoadScript>
                )}
            </Card>
        );
    }
}

HikeMap.propTypes = propTypes;
HikeMap.defaultProps = defaultProps;

export default HikeMap;

const MapContainer = styled.div`
    .hikeMap {
        border-top: 1px solid ${colors.gray};
        height: 350px;
        width: 100%;

        @media ${device.tablet} {
            height: 250px;
        }
    }
`;
