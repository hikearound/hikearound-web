import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SRLWrapper } from 'simple-react-lightbox';
import { Card, CardContent } from '../../styles/card';
import { SecondaryHeading } from '../../styles/headings';
import { getHikeImage, getHikeThumbnail } from '../../utils/hike';
import Thumbnail from '../Thumbnail';
import { options } from '../../constants/lightbox';
import { withTranslation } from '../../utils/i18n';

const propTypes = {
    images: PropTypes.object,
    id: PropTypes.string.isRequired,
};

const defaultProps = {
    images: {},
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

    componentDidUpdate(prevProps) {
        const { images } = this.props;

        if (prevProps.images !== images) {
            this.clearImageArrays();
            this.buildHikeImageArray();
        }
    }

    buildHikeImageArray = async () => {
        const { id, images } = this.props;
        const photoCount = Object.keys(images).length;

        const imageArray = [];
        const thumbArray = [];

        for (let i = 0; i < photoCount; i += 1) {
            const thumbnailUrl = await getHikeThumbnail(id, i);
            const imageUrl = await getHikeImage(id, i);

            thumbArray.push(thumbnailUrl);
            imageArray.push(imageUrl);
        }

        this.setState({ imageArray, thumbArray });
    };

    clearImageArrays = () => {
        this.setState({ imageArray: [], thumbArray: [] });
    };

    renderGallery() {
        const { images } = this.props;
        const { imageArray, thumbArray } = this.state;

        return (
            <CardContent>
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
Gallery.defaultProps = defaultProps;

export default withTranslation('common')(Gallery);

const PhotoGallery = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
