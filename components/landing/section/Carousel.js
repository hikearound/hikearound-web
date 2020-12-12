import React from 'react';
import { Section } from '../../../styles/landing';
import TextSection from '../Text';
import { carousel } from '../../../constants/carousel';
import Card from '../../carousel/Card';
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
                {hikes &&
                    hikes.map(
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

    render() {
        const { t } = this.props;

        return (
            <Section marginTop offset='true'>
                <TextSection
                    centered
                    title={t('section.carousel.title')}
                    description={t('section.carousel.description')}
                />
                {this.renderCarousel()}
            </Section>
        );
    }
}

export default withTranslation('landing')(CarouselSection);
