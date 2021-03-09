import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
import { Card } from '../../styles/card';
import { device } from '../../constants/breakpoints';
import { colors } from '../../constants/colors';
import { SecondaryHeading } from '../../styles/headings';
import { getHikeXmlUrl, parseHikeXml } from '../../utils/hike';
import AppleMap from '../Map';
import MapLoadingState from '../loading/Map';
import { mapHeight, gutterWidth } from '../../constants/dimensions';

const propTypes = {
    hid: PropTypes.string.isRequired,
    hike: PropTypes.object.isRequired,
};

class HikeMap extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            path: [],
            center: null,
            loading: true,
            coordinatesReady: false,
        };

        this.mapDidLoad = this.mapDidLoad.bind(this);
    }

    async componentDidMount() {
        await this.initializeMap();
    }

    async componentDidUpdate(prevProps) {
        const { hid } = this.props;

        if (prevProps.hid !== hid) {
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

        this.setState({ center, hikeData });
    }

    initializeMap = async () => {
        const { hid } = this.props;

        this.setState({
            coordinatesReady: false,
            loading: true,
        });

        const hikeXmlUrl = await getHikeXmlUrl(hid);
        const hikeData = await parseHikeXml(hikeXmlUrl);

        if (hikeData) {
            this.setHikeData(hikeData);
            this.plotCoordinates();
        }
    };

    mapDidLoad = () => {
        this.setState({ loading: false });
    };

    plotCoordinates() {
        const { hike } = this.props;
        const { hikeData } = this.state;
        const data = hikeData.gpx.trk[0].trkseg[0].trkpt;
        const coordinateCount = data.length;

        const path = [];
        const existingCoords = [];

        for (let i = 0, len = coordinateCount; i < len; i += 1) {
            const coordinate = data[i].$;
            const exists = existingCoords.includes(coordinate.lat);

            const currentCoordinate = [
                parseFloat(coordinate.lat),
                parseFloat(coordinate.lon),
            ];

            if (hike.route === 'Loop') {
                path.push(currentCoordinate);
            }

            if (!exists && hike.route === 'Out') {
                path.push(currentCoordinate);
                existingCoords.push(coordinate.lat);
            }
        }

        this.setState({ path, coordinatesReady: true });
    }

    render() {
        const { hid, t } = this.props;
        const { path, center, coordinatesReady, loading } = this.state;

        return (
            <MapCard noPadding>
                <SecondaryHeading isCard>
                    {t('card.title.map')}
                </SecondaryHeading>
                <MapContainer>
                    {loading && <MapLoadingState hid={hid} />}
                    {coordinatesReady && (
                        <AppleMap
                            center={center}
                            points={path}
                            mapDidLoad={this.mapDidLoad}
                        />
                    )}
                </MapContainer>
            </MapCard>
        );
    }
}

HikeMap.propTypes = propTypes;

export default withTranslation('common')(HikeMap);

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
    height: ${mapHeight.desktop};
    width: 100%;

    @media ${device.tablet} {
        border-top: ${gutterWidth.mobile} solid ${colors.grayLight};
        height: ${mapHeight.mobile};
    }
`;
