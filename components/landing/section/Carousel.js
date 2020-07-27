import React from 'react';
import { Section } from '../../../styles/landing';
import TextSection from '../Text';
import { hikeData } from '../../../constants/data';
import { carousel } from '../../../constants/carousel';
import Card from '../../carousel/Card';
import Carousel from '../../carousel/Carousel';
import { withTranslation } from '../../../utils/i18n';

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
