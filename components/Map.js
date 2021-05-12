import React from 'react';
import styled from 'styled-components';
import { Map } from 'react-mapkit';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { colors } from '../constants/colors';
import { withMap, getMapPadding } from '../utils/map';
import { device } from '../constants/breakpoints';
import { mapHeight } from '../constants/dimensions';

const propTypes = {
    center: PropTypes.object,
    points: PropTypes.array.isRequired,
    map: PropTypes.object,
    mapProps: PropTypes.object.isRequired,
    setCenter: PropTypes.func.isRequired,
    showFilteredPointsOfInterest: PropTypes.bool,
    mapDidLoad: PropTypes.func,
};

const defaultProps = {
    map: null,
    center: {},
    showFilteredPointsOfInterest: false,
    mapDidLoad: () => {},
};

class AppleMap extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            didLoad: false,
            className: 'innerWrapper',
        };
    }

    componentDidUpdate() {
        const { center, points, map } = this.props;
        const { didLoad } = this.state;

        if (map && !didLoad) {
            this.setOptions();
            this.setCenter(center);
            this.plotPoints(points);
            this.maybeFilterPoints();
            this.addAnnotation(points);
            this.setLoadState();
        }
    }

    setOptions = () => {
        const { map, showFilteredPointsOfInterest } = this.props;

        if (isMobile) {
            map.isScrollEnabled = false;
        }

        map.showsUserLocationControl = true;
        map.showsScale = mapkit.FeatureVisibility.Visible;
        map.showsPointsOfInterest = showFilteredPointsOfInterest;
    };

    setCenter = (center) => {
        const { setCenter } = this.props;

        if (center) {
            setCenter([center.lat, center.lng]);
        }
    };

    plotPoints = () => {
        const { points, map } = this.props;
        const { Coordinate, Style, PolylineOverlay, Padding } = mapkit;

        if (points) {
            const coords = points.map(
                (point) => new Coordinate(point[0], point[1]),
            );

            const style = new Style({
                strokeColor: colors.purple,
                lineWidth: 2,
                lineJoin: 'round',
                lineDash: [],
            });

            const trail = new PolylineOverlay(coords, { style });
            const padding = getMapPadding();

            map.showItems(trail, {
                animate: false,
                padding: new Padding(padding, padding, padding, padding),
            });
        }
    };

    maybeFilterPoints = () => {
        const { map, showFilteredPointsOfInterest } = this.props;

        const { Hospital, Pharmacy, FoodMarket, Park, Museum } =
            mapkit.PointOfInterestCategory;

        const filteredCategories = [
            Hospital,
            Pharmacy,
            FoodMarket,
            Park,
            Museum,
        ];

        const filter =
            mapkit.PointOfInterestFilter.excluding(filteredCategories);

        if (showFilteredPointsOfInterest) {
            map.pointOfInterestFilter = filter;
        }
    };

    addAnnotation = (points) => {
        const { map } = this.props;
        const coordinates = points[0];
        const { MarkerAnnotation, Coordinate } = mapkit;

        const startingPoint = new Coordinate(coordinates[0], coordinates[1]);
        const startingAnnotation = new MarkerAnnotation(startingPoint, {
            appearanceAnimation: 'none',
            color: colors.purple,
            glyphImage: { 1: '../images/annotation/glyph.png' },
        });

        map.addAnnotations([startingAnnotation]);
    };

    setLoadState = () => {
        const { mapDidLoad } = this.props;
        const { didLoad } = this.state;

        if (!didLoad) {
            setTimeout(async () => {
                await this.setState({
                    didLoad: true,
                    className: 'innerWrapper fadeIn',
                });
                mapDidLoad();
            }, 2000);
        }
    };

    render() {
        const { mapProps } = this.props;
        const { didLoad, className } = this.state;

        return (
            <MapWrapper didLoad={didLoad}>
                <FadeWrapper className={className}>
                    <Map {...mapProps} />
                </FadeWrapper>
            </MapWrapper>
        );
    }
}

AppleMap.propTypes = propTypes;
AppleMap.defaultProps = defaultProps;

export default withMap(AppleMap);

export const MapWrapper = styled.div`
    visibility: ${(props) => (props.didLoad ? 'visible' : 'hidden')};

    .mk-map-view {
        height: ${mapHeight.desktop};
    }

    .innerWrapper {
        transition: opacity 0.25s ease-in;
        opacity: 0;
    }

    .fadeIn {
        opacity: 1;
    }

    @media ${device.tablet} {
        .mk-map-view {
            height: ${mapHeight.mobile};
        }
    }
`;

export const FadeWrapper = styled.div`
    display: block;
`;
