import React from 'react';
import PropTypes from 'prop-types';
import { GenericPill } from '../../../styles/pill';

const propTypes = {
    label: PropTypes.string.isRequired,
};

class LocationPill extends React.PureComponent {
    render() {
        const { label } = this.props;

        return <GenericPill>{label}</GenericPill>;
    }
}

LocationPill.propTypes = propTypes;

export default LocationPill;
