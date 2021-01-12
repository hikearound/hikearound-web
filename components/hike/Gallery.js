import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SRLWrapper } from 'simple-react-lightbox';
import { isMobile } from 'react-device-detect';
import { Card, CardContent } from '../../styles/card';
import { SecondaryHeading } from '../../styles/headings';
import { getHikeImageGallery } from '../../utils/hike';
import Thumbnail from '../Thumbnail';
import { options } from '../../constants/lightbox';
import { withTranslation } from '../../utils/i18n';
import GalleryLoadingState from '../loading/Gallery';

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
            imageArray.push(images[i].uri.cover);
            thumbArray.push(images[i].uri.thumbnail);
        }

        this.setState({ imageArray, thumbArray, loading: true });
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
