import React from 'react';
import { Map } from 'react-mapkit';
import PropTypes from 'prop-types';
import colors from '../constants/colors';
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

        if (points && map) {
            const coords = points.map(function (point) {
                return new mapkit.Coordinate(point[0], point[1]);
            });

            const style = new mapkit.Style({
                strokeColor: colors.purple,
                strokeOpacity: 1,
                lineWidth: 2,
                lineJoin: 'round',
                lineDash: [],
            });

            const trail = new mapkit.PolylineOverlay(coords, { style });
            map.addOverlay(trail);
        }
    };

    render() {
        const { center, points, mapProps, region } = this.props;

        this.setRegion(region);
        this.setCenter(center);
        this.plotPoints(points);

        return <Map {...mapProps} />;
    }
}

AppleMap.propTypes = propTypes;
AppleMap.defaultProps = defaultProps;

export default withMap(AppleMap);
