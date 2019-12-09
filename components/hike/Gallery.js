import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, CardContent } from '../../styles/card';
import { SecondaryHeading } from '../../styles/headings';
import { getHikeImage } from '../../utils/hike';
import Thumbnail from '../Thumbnail';
import ImageModal from './ImageModal';

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
            modalIsOpen: false,
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
            imageArray.push({
                src: imageUrl,
                attribution: images[i],
            });
        }

        this.setState({ imageArray });
    };

    openModal = (index) => {
        this.setState({
            modalIsOpen: true,
            currentImage: index,
        });
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            currentImage: 0,
        });
    };

    renderGallery() {
        const { imageArray } = this.state;

        return (
            <PhotoGallery>
                {imageArray.map((image, index) => (
                    <ThumbnailButton
                        onClick={() => {
                            this.openModal(index);
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
        );
    }

    renderModal() {
        const { imageArray, modalIsOpen, currentImage } = this.state;

        return (
            <ImageModal
                imageArray={imageArray}
                modalIsOpen={modalIsOpen}
                currentImage={currentImage}
                closeModal={this.closeModal}
            />
        );
    }

    render() {
        return (
            <Card noPadding>
                <SecondaryHeading isCard>Photo Gallery</SecondaryHeading>
                <CardContent>{this.renderGallery()}</CardContent>
                {this.renderModal()}
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

    &: hover {
        cursor: pointer;
    }
`;
