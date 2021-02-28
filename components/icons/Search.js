import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};

const defaultProps = {
    size: 16,
    color: '#FFFFFF',
};

function SearchIcon({ size, color }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 74 74`}
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M72 66.3L54.1 48.4c9-11.7 8.1-28.6-2.7-39.3C45.5 3.2 37.9.3 30.2.3 22.5.3 14.9 3.2 9 9.1-2.7 20.8-2.7 39.8 9 51.5c5.9 5.9 13.5 8.8 21.2 8.8 6.4 0 12.8-2 18.1-6.1l18 17.8c.8.8 1.8 1.2 2.9 1.2 1 0 2.1-.4 2.9-1.2 1.5-1.5 1.5-4.1-.1-5.7zM30.3 52.2c-5.9 0-11.3-2.3-15.5-6.4-8.5-8.5-8.5-22.4 0-31 4.1-4.1 9.6-6.4 15.5-6.4s11.3 2.3 15.5 6.4c4.2 4.1 6.4 9.6 6.4 15.5s-2.3 11.3-6.4 15.5c-4.1 4.2-9.7 6.4-15.5 6.4z'
                fill={color}
                fillRule='nonzero'
            />
        </svg>
    );
}

SearchIcon.propTypes = propTypes;
SearchIcon.defaultProps = defaultProps;

export default SearchIcon;
