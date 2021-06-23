import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { spacing } from '@constants/spacing';
import { colors } from '@constants/colors';
import { borderRadius } from '@constants/dimensions';

const propTypes = {
    image: PropTypes.string.isRequired,
    attribution: PropTypes.string.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
};

const defaultProps = {
    height: 90,
    width: 120,
};

class Thumbnail extends React.PureComponent {
    buildCaption = () => {
        const { attribution } = this.props;
        return `Photo by ${attribution}.`;
    };

    render() {
        const { image, height, width } = this.props;
        const alt = this.buildCaption();
        return (
            <ThumbnailImage
                src={image}
                alt={alt}
                height={height}
                width={width}
            />
        );
    }
}

Thumbnail.propTypes = propTypes;
Thumbnail.defaultProps = defaultProps;

export default Thumbnail;

const ThumbnailImage = styled.img`
    display: flex;
    background-color: ${colors.lightGray};
    width: 120px;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    border-radius: ${borderRadius.sm};
    margin: 0 ${spacing.sm} 0 0;
    object-fit: cover;
    color: white;
`;
