import React from 'react';
import PropTypes from 'prop-types';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withTranslation } from 'next-i18next';
import Link from 'next/link';
import LocationPill from './pill/Location';
import DifficultyPill from './pill/Difficulty';
import {
    PillSection,
    Gradient,
    InfoSection,
    Name,
    Distance,
    Elevation,
    CarouselCard,
    CardInterior,
    RatingWrapper,
    RatingText,
    StyledRating,
} from '../../styles/carousel';

const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    review: PropTypes.object.isRequired,
    coverPhoto: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    elevation: PropTypes.number.isRequired,
    difficulty: PropTypes.string.isRequired,
    hid: PropTypes.string.isRequired,
};

class Card extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            didLoad: false,
        };
    }

    componentDidMount() {
        this.setState({ didLoad: true });
    }

    renderGradient = () => <Gradient />;

    renderPills = () => {
        const { city, state, difficulty } = this.props;

        return (
            <PillSection>
                <LocationPill label={`${city}, ${state}`} />
                <DifficultyPill label={difficulty} />
            </PillSection>
        );
    };

    renderReview = () => {
        const { review, t } = this.props;

        return (
            <RatingWrapper>
                <StyledRating
                    name='customized-empty'
                    value={review.average}
                    max={5}
                    precision={0.5}
                    size='small'
                    emptyIcon={<StarBorderIcon fontSize='inherit' />}
                    disabled
                />
                <RatingText>
                    {t('common:review', { count: review.count })}
                </RatingText>
            </RatingWrapper>
        );
    };

    renderInfo = () => {
        const { name, distance, elevation, t } = this.props;

        return (
            <InfoSection>
                <Name>{name}</Name>
                {this.renderReview()}
                <Distance>{t('measurement.distance', { distance })}</Distance>
                <Elevation>
                    {t('measurement.elevation', {
                        elevation: elevation.toLocaleString(),
                    })}
                </Elevation>
            </InfoSection>
        );
    };

    render() {
        const { coverPhoto, hid } = this.props;
        const { didLoad } = this.state;

        return (
            <Link href='/hike/[hid]' as={`/hike/${hid}`}>
                <CarouselCard href={`/hike/${hid}`} didLoad={didLoad}>
                    <CardInterior
                        className='cardBackground'
                        image={coverPhoto}
                    />
                    {this.renderGradient()}
                    {this.renderPills()}
                    {this.renderInfo()}
                </CarouselCard>
            </Link>
        );
    }
}

Card.propTypes = propTypes;

export default withTranslation(['hike', 'common'])(Card);
