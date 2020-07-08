import React from 'react';
import { Section } from '../../../styles/landing';
import TextSection from '../Text';
import { hikeData } from '../../../constants/data';
import { carousel } from '../../../constants/carousel';
import Card from '../../carousel/Card';
import Carousel from '../../carousel/Carousel';

class CarouselSection extends React.PureComponent {
    renderCarousel = () => {
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
                {hikeData.map(({ name, city, map, id }, index) => (
                    <Card
                        name={name}
                        city={city}
                        map={map}
                        id={id}
                        key={index}
                    />
                ))}
            </Carousel>
        );
    };

    render() {
        return (
            <Section marginTop offset='true'>
                <TextSection
                    centered
                    title='The path is yours to choose.'
                    description="No matter your skill level or experience, you'll find hikes that you and your friends will love."
                />
                {this.renderCarousel()}
            </Section>
        );
    }
}

export default CarouselSection;
