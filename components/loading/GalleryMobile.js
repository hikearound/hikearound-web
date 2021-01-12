import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

const propTypes = {
    hid: PropTypes.string.isRequired,
};

class GalleryLoadingState extends React.PureComponent {
    render() {
        const { hid } = this.props;

        return (
            <ContentLoader
                viewBox='0 0 375 90'
                style={{ width: '100%' }}
                uniqueKey={hid}
            >
                <rect x='0' y='0' rx='4' ry='4' width='120' height='90' />
                <rect x='128' y='0' rx='4' ry='4' width='120' height='90' />
                <rect x='256' y='0' rx='4' ry='4' width='120' height='90' />
            </ContentLoader>
        );
    }
}

export default GalleryLoadingState;

GalleryLoadingState.propTypes = propTypes;
