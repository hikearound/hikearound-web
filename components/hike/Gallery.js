import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SRLWrapper } from 'simple-react-lightbox';
import { Card, CardContent } from '../../styles/card';
import { SecondaryHeading } from '../../styles/headings';
import { getHikeImageGallery } from '../../utils/hike';
import Thumbnail from '../Thumbnail';
import { options } from '../../constants/lightbox';
import { withTranslation } from '../../utils/i18n';

const propTypes = {
    id: PropTypes.string.isRequired,
};

class Gallery extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            imageArray: [],
        };
    }

    async componentDidMount() {
        await this.setImages();
        await this.buildImageArray();
    }

    async componentDidUpdate(prevProps) {
        const { id } = this.props;

        if (prevProps.id !== id) {
            this.clearImageArrays();

            await this.setImages();
            await this.buildImageArray();
        }
    }

    clearImageArrays = () => {
        this.setState({ imageArray: [], thumbArray: [] });
    };

    setImages = async () => {
        const { id } = this.props;
        const { images, count } = await getHikeImageGallery(id);

        this.setState({ images, count });
    };

    buildImageArray = () => {
        const { images, count } = this.state;

        const imageArray = [];
        const thumbArray = [];

        for (let i = 0; i < count; i += 1) {
            imageArray.push(images[i].uri.cover);
            thumbArray.push(images[i].uri.thumbnail);
        }

        this.setState({ imageArray, thumbArray });
    };

    renderGallery() {
        const { imageArray, thumbArray, images } = this.state;

        return (
            <CardContent includeMinHeight fullWidth>
                <PhotoGallery>
                    <SRLWrapper options={options}>
                        {imageArray.map((image, index) => (
                            <ThumbnailButton
                                key={index}
                                href={imageArray[index]}
                                data-attribute='SRL'
                            >
                                <Thumbnail
                                    image={thumbArray[index]}
                                    imageIndex={index}
                                    key={index}
                                    attribution={images[0].attribution.name}
                                />
                            </ThumbnailButton>
                        ))}
                    </SRLWrapper>
                </PhotoGallery>
            </CardContent>
        );
    }

    render() {
        const { t } = this.props;

        return (
            <Card lastChild noPadding>
                <SecondaryHeading isCard>
                    {t('card.title.gallery')}
                </SecondaryHeading>
                {this.renderGallery()}
            </Card>
        );
    }
}

Gallery.propTypes = propTypes;

export default withTranslation('common')(Gallery);

const PhotoGallery = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: auto;
    white-space: nowrap;
    scrollbar-width: none;

    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb {
        width: 0;
        background: transparent;
        display: none;
    }

    div {
        display: flex;
    }
`;

const ThumbnailButton = styled.a`
    background-color: initial;
    margin: 0;
    padding: 0;
    border: none;
    display: inline-block;

    &:hover {
        cursor: pointer;
    }
`;
