import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import spacing from '../constants/spacing';
import { colors } from '../constants/colors';
import { borderRadius } from '../constants/dimensions';

const THUMBNAIL_DIMENSION = '75px';

const propTypes = {
    image: PropTypes.string.isRequired,
    attribution: PropTypes.string.isRequired,
};

class Thumbnail extends React.PureComponent {
    buildCaption = () => {
        const { attribution } = this.props;
        return `Photo by ${attribution}.`;
    };

    render() {
        const { image } = this.props;
        const alt = this.buildCaption();
        return <ThumbnailImage src={image} alt={alt} />;
    }
}

Thumbnail.propTypes = propTypes;

export default Thumbnail;

const ThumbnailImage = styled.img`
    display: flex;
    background-color: ${colors.lightGray};
    width: ${THUMBNAIL_DIMENSION};
    height: ${THUMBNAIL_DIMENSION};
    border-radius: ${borderRadius.sm};
    margin: 0 ${spacing.sm} 0 0;
    object-fit: cover;
    color: white;
`;
