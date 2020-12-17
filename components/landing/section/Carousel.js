import React from 'react';
import { StyledSection } from '../../../styles/landing';
import TextSection from '../Text';
import { carousel } from '../../../constants/carousel';
import Card from '../../carousel/Card';
import LoadingCard from '../../carousel/LoadingCard';
import Carousel from '../../carousel/Carousel';
import { withTranslation } from '../../../utils/i18n';
import { getFeaturedHikes } from '../../../utils/hike';

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
                            id,
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
                            id={id}
                            key={index}
                        />
                    ),
                )}
            </Carousel>
        );
    };

    renderLoadingState = () => {
        return (
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
    };

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
