import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, CardContent } from '../../styles/card';
import { SecondaryHeading } from '../../styles/headings';
import { getHikeImage } from '../../utils/hike';
import Thumbnail from '../Thumbnail';

const propTypes = {
    images: PropTypes.array,
    id: PropTypes.string.isRequired,
};

const defaultProps = {
    images: [],
};

class Gallery extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            imageArray: [],
        };
    }

    componentDidMount() {
        this.buildHikeImageArray();
    }

    buildHikeImageArray = async () => {
        const { id, images } = this.props;
        const imageArray = [];

        for (let i = 0; i < images.length; i += 1) {
            const imageUrl = await getHikeImage(id, i);
            imageArray.push({
                uri: imageUrl,
                attribution: images[i],
            });
        }

        this.setState({ imageArray });
    };

    renderGallery() {
        const { imageArray } = this.state;

        return (
            <PhotoGallery>
                {imageArray.map((image, index) => (
                    <Thumbnail image={image} imageIndex={index} key={index} />
                ))}
            </PhotoGallery>
        );
    }

    render() {
        return (
            <Card noPadding>
                <SecondaryHeading isCard>Photo Gallery</SecondaryHeading>
                <CardContent>{this.renderGallery()}</CardContent>
            </Card>
        );
    }
}

Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;

export default Gallery;

const PhotoGallery = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
