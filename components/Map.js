import React from 'react';
import { Map } from 'react-mapkit';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { colors } from '../constants/colors';
import { withMap } from '../utils/map';

const propTypes = {
    center: PropTypes.object,
    points: PropTypes.array.isRequired,
    map: PropTypes.object,
    mapProps: PropTypes.object.isRequired,
    setCenter: PropTypes.func.isRequired,
    padding: PropTypes.number,
    showFilteredPointsOfInterest: PropTypes.bool,
};

const defaultProps = {
    map: null,
    center: {},
    padding: 80,
    showFilteredPointsOfInterest: false,
};

class AppleMap extends React.Component {
    componentDidUpdate() {
        const { center, points, map } = this.props;

        if (map) {
            this.setOptions();
            this.setCenter(center);
            this.plotPoints(points);
            this.maybeFilterPoints();
            this.addAnnotation(points);
        }
    }

    setOptions = () => {
        const { map, showFilteredPointsOfInterest } = this.props;

        if (isMobile) {
            map.isScrollEnabled = false;
        }

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
        const { points, map, padding } = this.props;
        const { Coordinate, Style, PolylineOverlay, Padding } = mapkit;

        if (points) {
            const coords = points.map(function (point) {
                return new Coordinate(point[0], point[1]);
            });

            const style = new Style({
                strokeColor: colors.purple,
                lineWidth: 2,
                lineJoin: 'round',
                lineDash: [],
            });

            const trail = new PolylineOverlay(coords, { style });

            map.showItems(trail, {
                animate: true,
                padding: new Padding(padding, padding, padding, padding),
            });
        }
    };

    maybeFilterPoints = () => {
        const { map, showFilteredPointsOfInterest } = this.props;

        const {
            Hospital,
            Pharmacy,
            FoodMarket,
            Park,
            Museum,
        } = mapkit.PointOfInterestCategory;

        const filteredCategories = [
            Hospital,
            Pharmacy,
            FoodMarket,
            Park,
            Museum,
        ];

        const filter = mapkit.PointOfInterestFilter.excluding(
            filteredCategories,
        );

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

    render() {
        const { mapProps } = this.props;
        return <Map {...mapProps} showsZoomControl={false} />;
    }
}

AppleMap.propTypes = propTypes;
AppleMap.defaultProps = defaultProps;

export default withMap(AppleMap);
