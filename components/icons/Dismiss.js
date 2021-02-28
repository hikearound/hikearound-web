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

function DismissIcon({ size, color }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 96 96'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M48 .5C21.8.5.5 21.8.5 48S21.8 95.5 48 95.5 95.5 74.2 95.5 48 74.2.5 48 .5zm17.1 60.7c1.1 1.1 1.1 2.8 0 3.9-.5.5-1.2.8-1.9.8s-1.4-.3-1.9-.8L48 51.9 34.8 65.1c-.5.5-1.2.8-1.9.8s-1.4-.3-1.9-.8c-1.1-1.1-1.1-2.8 0-3.9L44.1 48 30.9 34.8c-1.1-1.1-1.1-2.8 0-3.9s2.8-1.1 3.9 0L48 44.1l13.2-13.2c1.1-1.1 2.8-1.1 3.9 0s1.1 2.8 0 3.9L51.9 48l13.2 13.2z'
                fill={color}
                fillRule='nonzero'
            />
        </svg>
    );
}

DismissIcon.propTypes = propTypes;
DismissIcon.defaultProps = defaultProps;

export default DismissIcon;
