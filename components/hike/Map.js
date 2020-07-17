import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Card } from '../../styles/card';
import { device } from '../../constants/breakpoints';
import { colors } from '../../constants/colors';
import { SecondaryHeading } from '../../styles/headings';
import { getHikeXmlUrl, parseHikeXml } from '../../utils/hike';
import AppleMap from '../Map';

const propTypes = {
    id: PropTypes.string.isRequired,
    modifier: PropTypes.number,
};

const defaultProps = {
    modifier: 0.006,
};

class HikeMap extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            path: [],
            center: null,
            shouldShowMap: false,
        };
    }

    async componentDidMount() {
        await this.initializeMap();
    }

    async componentDidUpdate(prevProps) {
        const { id } = this.props;

        if (prevProps.id !== id) {
            await this.initializeMap();
        }
    }

    setHikeData(hikeData) {
        const hikeMetaData = hikeData.gpx.metadata[0].bounds[0].$;
        const { maxlat, minlat, minlon, maxlon } = hikeMetaData;

        const center = {
            lat: (parseFloat(maxlat) + parseFloat(minlat)) / 2,
            lng: (parseFloat(maxlon) + parseFloat(minlon)) / 2,
            hikeData,
        };

        this.setRegion(hikeMetaData);
        this.setState({ center, hikeData });
    }

    setRegion(hikeMetaData) {
        const { modifier } = this.props;
        const { maxlat, minlat, minlon, maxlon } = hikeMetaData;

        const region = {
            latitude: parseFloat(maxlat),
            longitude: parseFloat(minlat),
            latitudeSpan: maxlat - minlat + modifier,
            longitudeSpan: maxlon - minlon + modifier,
        };

        this.setState({ region });
    }

    initializeMap = async () => {
        const { id } = this.props;

        this.setState({ shouldShowMap: false });

        const hikeXmlUrl = await getHikeXmlUrl(id);
        const hikeData = await parseHikeXml(hikeXmlUrl);

        if (hikeData) {
            this.setHikeData(hikeData);
            this.plotCoordinates();
        }
    };

    plotCoordinates() {
        const { hikeData } = this.state;
        const coordinateCount = hikeData.gpx.trk[0].trkseg[0].trkpt.length;

        const path = [];

        for (let i = 0, len = coordinateCount; i < len; i += 1) {
            const coordinate = hikeData.gpx.trk[0].trkseg[0].trkpt[i].$;
            path.push([parseFloat(coordinate.lat), parseFloat(coordinate.lon)]);
        }

        this.setState({ path, shouldShowMap: true });
    }

    render() {
        const { path, center, region, shouldShowMap } = this.state;

        return (
            <MapCard noPadding>
                <SecondaryHeading isCard>Trail Map</SecondaryHeading>
                <MapContainer>
                    {shouldShowMap && (
                        <AppleMap
                            center={center}
                            points={path}
                            region={region}
                        />
                    )}
                    {!shouldShowMap && (
                        <MapLoading>
                            <Skeleton height={450} width={650} />
                        </MapLoading>
                    )}
                </MapContainer>
            </MapCard>
        );
    }
}

HikeMap.propTypes = propTypes;
HikeMap.defaultProps = defaultProps;

export default HikeMap;

export const MapCard = styled(Card)`
    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`;

export const MapLoading = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
`;

const MapContainer = styled.div`
    border-top: 1px solid ${colors.gray};
    background-color: ${colors.grayLight};
    height: 350px;
    width: 100%;

    @media ${device.tablet} {
        border-top: 3px solid ${colors.grayLight};
        height: 250px;
    }
`;
