import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FsLightbox from 'fslightbox-react';
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
            isVisible: false,
            currentImage: 0,
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
            imageArray.push(imageUrl);
        }

        this.setState({ imageArray });
    };

    openLightbox = (index) => {
        const { isVisible } = this.state;
        this.setState({
            currentImage: index,
            isVisible: !isVisible,
        });
    };

    renderGallery() {
        const { imageArray } = this.state;

        return (
            <CardContent>
                <PhotoGallery>
                    {imageArray.map((image, index) => (
                        <ThumbnailButton
                            onClick={() => {
                                this.openLightbox(index);
                            }}
                            key={index}
                            type='button'
                        >
                            <Thumbnail
                                image={image}
                                imageIndex={index}
                                key={index}
                            />
                        </ThumbnailButton>
                    ))}
                </PhotoGallery>
            </CardContent>
        );
    }

    renderLightBox = () => {
        const { isVisible, imageArray, currentImage } = this.state;

        if (imageArray.length > 0) {
            return (
                <FsLightbox
                    toggler={isVisible}
                    sources={imageArray}
                    slide={currentImage}
                    type='image'
                />
            );
        }
        return null;
    };

    render() {
        return (
            <Card noPadding>
                <SecondaryHeading isCard>Photo Gallery</SecondaryHeading>
                {this.renderGallery()}
                {this.renderLightBox()}
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

const ThumbnailButton = styled.button`
    background-color: initial;
    margin: 0;
    padding: 0;
    border: none;

    &:hover {
        cursor: pointer;
    }
`;
