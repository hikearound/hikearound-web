import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SRLWrapper } from 'simple-react-lightbox';
import { withTranslation } from 'next-i18next';
import { Card, CardContent } from '@styles/card';
import { SecondaryHeading } from '@styles/headings';
import { getHikeImageGallery } from '@utils/hike';
import Thumbnail from '@components/Thumbnail';
import { options } from '@constants/lightbox';
import GalleryLoadingState from '@components/loading/Gallery';

const propTypes = {
    hid: PropTypes.string.isRequired,
};

class Gallery extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            imageArray: [],
            loading: true,
        };
    }

    async componentDidMount() {
        await this.setImages();
        await this.buildImageArray();
    }

    async componentDidUpdate(prevProps) {
        const { hid } = this.props;

        if (prevProps.hid !== hid) {
            await this.setDefaultStates();
            await this.setImages();
            await this.buildImageArray();
        }
    }

    setDefaultStates = async () => {
        this.setState({ imageArray: [], thumbArray: [], loading: true });
    };

    setImages = async () => {
        const { hid } = this.props;
        const { images, count } = await getHikeImageGallery(hid);

        this.setState({ images, count });
    };

    buildImageArray = () => {
        const { images, count } = this.state;

        const imageArray = [];
        const thumbArray = [];

        for (let i = 0; i < count; i += 1) {
            imageArray.push(images[i].uri.original);
            thumbArray.push(images[i].uri.thumbnail);
        }

        this.setState({ imageArray, thumbArray, loading: false });
    };

    renderGallery() {
        const { hid } = this.props;
        const { imageArray, thumbArray, images, loading } = this.state;

        return (
            <GalleryCardContent fullWidth>
                {loading && <GalleryLoadingState hid={hid} />}
                {!loading && (
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
                )}
            </GalleryCardContent>
        );
    }

    render() {
        const { t } = this.props;

        return (
            <Card noPadding>
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

const GalleryCardContent = styled(CardContent)`
    max-height: 90px;
`;
