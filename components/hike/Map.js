import React from 'react';
import { MapkitProvider, Map, useMap } from 'react-mapkit';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card } from '../../styles/card';
import { device } from '../../constants/breakpoints';
import colors from '../../constants/colors';
import { SecondaryHeading } from '../../styles/headings';
import { getHikeXmlUrl, parseHikeXml } from '../../utils/hike';

const propTypes = {
    id: PropTypes.string.isRequired,
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

    setHikeData(hikeData) {
        const hikeMetaData = hikeData.gpx.metadata[0].bounds[0].$;
        const { maxlat, minlat, minlon, maxlon } = hikeMetaData;

        const center = {
            lat: (parseFloat(maxlat) + parseFloat(minlat)) / 2,
            lng: (parseFloat(maxlon) + parseFloat(minlon)) / 2,
            hikeData,
        };

        this.setState({ center, hikeData });
    }

    initializeMap = async (map) => {
        const { id } = this.props;
        const hikeXmlUrl = await getHikeXmlUrl(id);
        const hikeData = await parseHikeXml(hikeXmlUrl);

        if (hikeData) {
            this.setHikeData(hikeData, map);
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

        this.setState({ path });
    }

    renderEmptyState = () => {
        return <MapEmptyState />;
    };

    render() {
        const { path, center } = this.state;

        return (
            <Card noPadding>
                <SecondaryHeading isCard>Trail Map</SecondaryHeading>
                <MapContainer>
                    <MapkitProvider tokenOrCallback='eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVEQUZEUDJLTTcifQ.eyJpc3MiOiIyRFM2N1E0N0VTIiwiaWF0IjoxNTkwNDc2NDMzLCJleHAiOjE2MTk5Mzg4MzN9.peQpLuOIExk-b0xAR5Jl8XfijdgwPtdOk5CSI17sSfQ83SUyi1RRNyhO2Xma9Fu_eC_PpVjkFQ2CACPQpF4EoQ'>
                        <AppleMap center={center} points={path} />
                    </MapkitProvider>
                </MapContainer>
            </Card>
        );
    }
}

const AppleMap = (props) => {
    const { center, points } = props;
    const { map, mapProps, setCenter, setRegion } = useMap();

    setRegion({
        latitude: 37.415,
        longitude: -122.048333,
        latitudeSpan: 0.05,
        longitudeSpan: 0.11,
    });

    if (center) {
        setCenter([center.lat, center.lng]);
    }

    if (map && points) {
        const coords = points.map(function (point) {
            return new mapkit.Coordinate(point[0], point[1]);
        });

        const style = new mapkit.Style({
            strokeColor: 'black',
            strokeOpacity: 1,
            lineWidth: 2,
            lineJoin: 'round',
            lineDash: [],
        });

        const rectangle = new mapkit.PolylineOverlay(coords, { style });

        if (map) {
            map.addOverlay(rectangle);
        }
    }

    return <Map {...mapProps} />;
};

AppleMap.propTypes = {
    center: PropTypes.object.isRequired,
    points: PropTypes.array.isRequired,
};

HikeMap.propTypes = propTypes;

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
    ${mapStyle};
`;
