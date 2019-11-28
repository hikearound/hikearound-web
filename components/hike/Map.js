import React from 'react';
import {
    GoogleMap,
    withGoogleMap,
    withScriptjs,
    Marker,
} from 'react-google-maps';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Card } from '../../styles/card';
import { borderRadius } from '../../constants/dimensions';
import { device } from '../../constants/breakpoints';
import colors from '../../constants/colors';
import { SecondaryHeading } from '../../styles/headings';

const googleMapUrl =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyDNvaSlj_yrjkhClop5dPBDPSNUjOUS_a8';

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

const Map = compose(
    withScriptjs,
    withGoogleMap,
)((props) => (
    <GoogleMap
        defaultZoom={props.defaultZoom}
        defaultCenter={props.defaultCenter}
        options={props.mapOptions}
    >
        {props.isMarkerShown && <Marker position={props.position} />}
    </GoogleMap>
));

class MapCard extends React.PureComponent {
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

    renderLoadingElement = () => {
        return <LoadingElement />;
    };

    renderContainerElement = () => {
        return <ContainerElement />;
    };

    renderMapElement = () => {
        return <MapElement />;
    };

    createMapOptions = () => {
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
                <Map
                    isMarkerShown={isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                    googleMapURL={googleMapUrl}
                    loadingElement={this.renderLoadingElement()}
                    containerElement={this.renderContainerElement()}
                    mapElement={this.renderMapElement()}
                    defaultCenter={defaultCenter}
                    position={position}
                    defaultZoom={defaultZoom}
                    mapOptions={this.createMapOptions()}
                />
            </Card>
        );
    }
}

MapCard.propTypes = propTypes;
MapCard.defaultProps = defaultProps;

export default MapCard;

const LoadingElement = styled.div`
    height: 100%;
`;

const ContainerElement = styled.div`
    height: 350px;

    @media ${device.tablet} {
        height: 250px;
    }
`;

const MapElement = styled.div`
    height: 100%;
    border-bottom-left-radius: ${borderRadius.sm};
    border-bottom-right-radius: ${borderRadius.sm};
    border-top: 1px solid ${colors.gray};

    @media ${device.tablet} {
        border-radius: 0;
    }
`;
