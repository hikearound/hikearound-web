import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card } from '../../styles/card';
import { borderRadius } from '../../constants/dimensions';
import { device } from '../../constants/breakpoints';
import colors from '../../constants/colors';
import { SecondaryHeading } from '../../styles/headings';

const mapApiKey = 'AIzaSyDNvaSlj_yrjkhClop5dPBDPSNUjOUS_a8';

const propTypes = {
    defaultCenter: PropTypes.object,
    position: PropTypes.object,
    defaultZoom: PropTypes.number,
};

const defaultProps = {
    defaultCenter: { lat: -34.397, lng: 150.644 },
    position: { lat: -34.397, lng: 150.644 },
    defaultZoom: 8,
};

class HikeMap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isMarkerShown: false,
        };
    }

    componentDidMount() {
        this.delayedShowMarker();
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true });
        }, 3000);
    };

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false });
        this.delayedShowMarker();
    };

    mapOptions = () => {
        return {
            panControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId: 'terrain',
        };
    };

    render() {
        const { isMarkerShown } = this.state;
        const { defaultCenter, position, defaultZoom } = this.props;

        return (
            <Card noPadding>
                <SecondaryHeading isCard>Trail Map</SecondaryHeading>
                <LoadScript googleMapsApiKey={mapApiKey}>
                    <MapContainer>
                        <GoogleMap
                            mapContainerClassName='hikeMap'
                            options={this.mapOptions()}
                            isMarkerShown={isMarkerShown}
                            onMarkerClick={this.handleMarkerClick}
                            center={defaultCenter}
                            position={position}
                            zoom={defaultZoom}
                        >
                            {isMarkerShown && <Marker position={position} />}
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
