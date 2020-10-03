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
    setRegion: PropTypes.func.isRequired,
    region: PropTypes.object,
};

const defaultProps = {
    map: null,
    region: {},
    center: {},
};

class AppleMap extends React.Component {
    componentDidUpdate() {
        const { center, points, map, region } = this.props;

        if (map) {
            this.setOptions();
            this.setRegion(region);
            this.setCenter(center);
            this.plotPoints(points);
            this.filterPoints();
            this.addAnnotation(points);
        }
    }

    setOptions = () => {
        const { map } = this.props;

        if (isMobile) {
            map.isScrollEnabled = false;
        }

        map.showsScale = mapkit.FeatureVisibility.Visible;
    };

    setCenter = (center) => {
        const { setCenter } = this.props;

        if (center) {
            setCenter([center.lat, center.lng]);
        }
    };

    setRegion = (region) => {
        const { setRegion } = this.props;

        if (region) {
            setRegion(region);
        }
    };

    plotPoints = () => {
        const { points, map } = this.props;

        if (points) {
            const coords = points.map(function (point) {
                return new mapkit.Coordinate(point[0], point[1]);
            });

            const style = new mapkit.Style({
                strokeColor: colors.purple,
                strokeOpacity: 1,
                lineWidth: 2,
                lineDash: [],
            });

            const trail = new mapkit.PolylineOverlay(coords, { style });
            map.addOverlay(trail);
        }
    };

    filterPoints = () => {
        const { map } = this.props;
        const { Hospital, Pharmacy } = mapkit.PointOfInterestCategory;

        const filteredCategories = [Hospital, Pharmacy];
        const filter = mapkit.PointOfInterestFilter.excluding(
            filteredCategories,
        );

        map.pointOfInterestFilter = filter;
    };

    addAnnotation = (points) => {
        const { map } = this.props;
        const coordinates = points[0];
        const { MarkerAnnotation } = mapkit;

        const startingPoint = new mapkit.Coordinate(
            coordinates[0],
            coordinates[1],
        );

        const startingAnnotation = new MarkerAnnotation(startingPoint, {
            color: colors.purple,
            title: '',
            glyphImage: {
                1: '../images/annotation/glyph.png',
            },
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
