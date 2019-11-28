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
import { SubHeading } from '../../styles/headings';

const googleMapUrl =
    'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places';

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

    render() {
        const { isMarkerShown } = this.state;
        const { defaultCenter, position, defaultZoom } = this.props;

        return (
            <Card>
                <SubHeading>Map</SubHeading>
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
                />
            </Card>
        );
    }
}

MapCard.propTypes = propTypes;
MapCard.defaultProps = defaultProps;

export default MapCard;

const LoadingElement = styled.div`
    display: block;
    height: 100%;
`;

const ContainerElement = styled.div`
    display: block;
    height: 400px;
`;

const MapElement = styled.div`
    display: block;
    height: 100%;
`;
