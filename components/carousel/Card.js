import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { device } from '../../constants/breakpoints';
import { colors } from '../../constants/colors';

const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    map: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

class Card extends React.PureComponent {
    render() {
        const { name, city, map, id } = this.props;

        return (
            <Link href='/hike/[id]' as={`/hike/${id}`}>
                <CarouselCard href={`/hike/${id}`}>
                    <Map map={map}>
                        <MapGradient>
                            <InfoSection>
                                <HikeName>{name}</HikeName>
                                <City>{city}</City>
                            </InfoSection>
                        </MapGradient>
                    </Map>
                </CarouselCard>
            </Link>
        );
    }
}

Card.propTypes = propTypes;

export default Card;

const CarouselCard = styled.a`
    border: 1px solid ${colors.gray};
    height: 225px;
    width: 100%;
    border-radius: 4px;
    background-color: ${colors.gray};
    margin: 40px 10px 80px 10px;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
    }

    @media ${device.tablet} {
        height: 200px;
        margin-bottom: 40px;
    }
`;

const Map = styled.div`
    background-image: ${(props) => `url(${props.map})`};
    background-size: cover;
    height: 100%;
    position: relative;
    border-radius: 4px;
    background-position: center;
`;

const InfoSection = styled.div`
    text-align: left;
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-weight: 450;
`;

const MapGradient = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 180px;
    background-image: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 40%,
        rgba(0, 0, 0, 0.95) 98%
    );
    border-radius: 4px;
`;

const HikeName = styled.div`
    display: inline-block;
    font-size: 15px;
    margin-right: 5px;
    color: ${colors.white};

    &:after {
        content: '\\b7';
        margin-left: 5px;
    }
`;

const City = styled.div`
    display: inline-block;
    font-size: 15px;
    color: ${colors.white};
`;
