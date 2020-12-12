import React from 'react';
import PropTypes from 'prop-types';
import { Link, withTranslation } from '../../utils/i18n';
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
} from '../../styles/carousel';

const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    coverPhoto: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    elevation: PropTypes.number.isRequired,
    difficulty: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

class Card extends React.PureComponent {
    renderGradient = () => {
        return <Gradient />;
    };

    renderPills = () => {
        const { city, state, difficulty } = this.props;

        return (
            <PillSection>
                <LocationPill label={`${city}, ${state}`} />
                <DifficultyPill label={difficulty} />
            </PillSection>
        );
    };

    renderInfo = () => {
        const { name, distance, elevation, t } = this.props;

        return (
            <InfoSection>
                <Name>{name}</Name>
                <Distance>{t('measurement.distance', { distance })}</Distance>
                <Elevation>
                    {t('measurement.elevation', { elevation })}
                </Elevation>
            </InfoSection>
        );
    };

    render() {
        const { coverPhoto, id } = this.props;

        return (
            <Link href='/hike/[id]' as={`/hike/${id}`}>
                <CarouselCard href={`/hike/${id}`}>
                    <CardInterior
                        image={coverPhoto}
                        className='cardBackground'
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

export default withTranslation(['hike'])(Card);
