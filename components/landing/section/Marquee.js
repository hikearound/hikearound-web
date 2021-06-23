import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';
import { StyledSection } from '@styles/landing';
import TextSection from '@components/landing/Text';
import Card from '@components/marquee/Card';
import LoadingCard from '@components/marquee/LoadingCard';
import { getFeaturedHikes } from '@utils/hike';

const propTypes = {
    speed: PropTypes.number,
    direction: PropTypes.string,
};

const defaultProps = {
    speed: 40,
    direction: 'right',
};

class MarqueeSection extends React.PureComponent {
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

    renderMarquee = () => {
        const { speed, direction } = this.props;
        const { hikes } = this.state;

        return (
            <Marquee
                play
                pauseOnHover
                gradient={false}
                pauseOnClick={false}
                speed={speed}
                direction={direction}
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
            </Marquee>
        );
    };

    renderLoadingState = () => (
        <LoadingWrapper>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
        </LoadingWrapper>
    );

    render() {
        const { t } = this.props;
        const { hikes } = this.state;

        return (
            <StyledSection marginTop offset='true'>
                <TextSection
                    centered
                    title={t('section.marquee.title')}
                    description={t('section.marquee.description')}
                />
                {!hikes && this.renderLoadingState()}
                {hikes && this.renderMarquee()}
            </StyledSection>
        );
    }
}

MarqueeSection.propTypes = propTypes;
MarqueeSection.defaultProps = defaultProps;

export default withTranslation('landing')(MarqueeSection);

export const LoadingWrapper = styled.div`
    display: flex;
`;
