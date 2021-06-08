import React from 'react';
import { withTranslation } from 'next-i18next';
// import dynamic from 'next/dynamic';
import { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import { StyledSection } from '../../../styles/landing';
import TextSection from '../Text';
import { carousel } from '../../../constants/carousel';
import Card from '../../carousel/Card';
import LoadingCard from '../../carousel/LoadingCard';
import Carousel from '../../carousel/Carousel';
import { getFeaturedHikes } from '../../../utils/hike';

// const { slidesToShowPlugin } = dynamic(
//     () => import('@brainhubeu/react-carousel'),
//     { ssr: false },
// );

class CarouselSection extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            hikes: null,
        };
    }

    componentDidMount() {
        this.getFeaturedHikes();
    }

    getFeaturedHikes = async () => {
        const hikes = await getFeaturedHikes();
        this.setState({ hikes });
    };

    renderCarousel = () => {
        const { hikes } = this.state;

        return (
            <Carousel
                plugins={[
                    'arrows',
                    'centered',
                    'infinite',
                    {
                        resolve: slidesToShowPlugin,
                        options: {
                            numberOfSlides: carousel.desktop.slidesPerPage,
                        },
                    },
                ]}
                itemWidth={carousel.desktop.itemWidth}
                breakpoints={{
                    768: {
                        plugins: [
                            'arrows',
                            'infinite',
                            'centered',
                            {
                                resolve: slidesToShowPlugin,
                                options: {
                                    numberOfSlides:
                                        carousel.mobile.slidesPerPage,
                                },
                            },
                        ],
                        itemWidth: carousel.mobile.itemWidth,
                    },
                }}
            >
                {hikes.map(
                    (
                        {
                            name,
                            city,
                            state,
                            coverPhoto,
                            review,
                            distance,
                            elevation,
                            difficulty,
                            hid,
                        },
                        index,
                    ) => (
                        <Card
                            name={name}
                            city={city}
                            state={state}
                            coverPhoto={coverPhoto}
                            review={review}
                            distance={distance}
                            elevation={elevation}
                            difficulty={difficulty}
                            hid={hid}
                            key={index}
                        />
                    ),
                )}
            </Carousel>
        );
    };

    renderLoadingState = () => (
        <Carousel
            arrows
            slidesPerPage={carousel.desktop.slidesPerPage}
            infinite
            centered
            itemWidth={carousel.desktop.itemWidth}
            breakpoints={{
                768: {
                    slidesPerPage: carousel.mobile.slidesPerPage,
                    itemWidth: carousel.mobile.itemWidth,
                },
            }}
        >
            {[0].map((index) => (
                <LoadingCard key={index} />
            ))}
        </Carousel>
    );

    render() {
        const { t } = this.props;
        const { hikes } = this.state;

        return (
            <StyledSection marginTop offset='true'>
                <TextSection
                    centered
                    title={t('section.carousel.title')}
                    description={t('section.carousel.description')}
                />
                {!hikes && this.renderLoadingState()}
                {hikes && this.renderCarousel()}
            </StyledSection>
        );
    }
}

export default withTranslation('landing')(CarouselSection);
