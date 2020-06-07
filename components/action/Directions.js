import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import DirectionsIcon from '@material-ui/icons/Directions';
import { withRouter } from 'next/router';
import { googleMapUrl } from '../../constants/common';

const propTypes = {
    hike: PropTypes.object.isRequired,
};

class GetDirections extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            mapUrl: null,
        };
    }

    componentDidMount() {
        this.getMapUrl();
    }

    getMapUrl = () => {
        const { hike } = this.props;
        const { lat, lng } = hike.coordinates.starting;

        this.setState({
            mapUrl: `${googleMapUrl}//${lat},${lng}/@${lat},${lng},15z`,
        });
    };

    render() {
        const { mapUrl } = this.state;

        return (
            <a href={mapUrl} target='_blank' rel='noreferrer'>
                <Button startIcon={<DirectionsIcon />} size='small'>
                    Get Directions
                </Button>
            </a>
        );
    }
}

GetDirections.propTypes = propTypes;

export default withRouter(GetDirections);
