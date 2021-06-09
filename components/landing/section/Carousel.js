import React from 'react';
import { withTranslation } from 'next-i18next';
import Marquee from 'react-fast-marquee';
import { StyledSection } from '../../../styles/landing';
import TextSection from '../Text';
import Card from '../../carousel/Card';
import LoadingCard from '../../carousel/LoadingCard';
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
            <Marquee play pauseOnHover gradient={false} speed={30}>
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
            </Marquee>
        );
    };

    renderLoadingState = () => (
        <Marquee play={false} gradient={false} pauseOnHover>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
        </Marquee>
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
