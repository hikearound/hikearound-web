import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import spacing from '../constants/spacing';
import colors from '../constants/colors';
import { borderRadius } from '../constants/dimensions';

const THUMBNAIL_DIMENSION = '75px';

const propTypes = {
    image: PropTypes.object.isRequired,
};

class Thumbnail extends React.PureComponent {
    render() {
        const { image } = this.props;
        return <ThumbnailImage src={image.src} />;
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
`;
