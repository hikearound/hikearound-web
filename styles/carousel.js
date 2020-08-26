import styled from 'styled-components';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { borderRadius } from '../constants/dimensions';
import { fontSize, fontWeight } from '../constants/type';
import { device } from '../constants/breakpoints';

const cardMargin = '10px';

export const CarouselCard = styled.a`
    border: 1px solid ${colors.gray};
    height: 225px;
    width: 100%;
    margin: 40px ${cardMargin} 80px ${cardMargin};
    transition: transform 0.2s;
    border-radius: ${borderRadius.sm};
    background-color: ${colors.gray};
    background-image: ${(props) => `url(${props.image})`};
    background-size: cover;
    position: relative;
    border-radius: ${borderRadius.sm};
    background-position: center;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
    }

    @media ${device.tablet} {
        height: 200px;
        margin-bottom: 40px;

        &:hover {
            transform: scale(1);
        }
    }
`;

export const CardBackground = styled.div`
    background-image: ${(props) => `url(${props.image})`};
    background-size: cover;
    height: 100%;
    position: relative;
    border-radius: ${borderRadius.sm};
    background-position: center;
`;

export const InfoSection = styled.div`
    text-align: left;
    position: absolute;
    left: ${cardMargin};
    bottom: ${cardMargin};
`;

export const PillSection = styled.div`
    text-align: left;
    position: absolute;
    left: ${cardMargin};
    top: ${cardMargin};
    right: 0;

    div {
        &:first-child {
            margin-left: 0;
        }
    }
`;

export const Gradient = styled.div`
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
    border-radius: ${borderRadius.sm};
`;

export const Name = styled.div`
    display: block;
    font-size: ${fontSize.lg};
    color: ${colors.white};
    font-weight: ${fontWeight.medium};
    margin-bottom: ${spacing.xs};
`;

export const Label = styled.div`
    display: inline-block;
    font-size: ${fontSize.sm};
    color: ${colors.white};
    font-weight: ${fontWeight.regular};
`;

export const Distance = styled(Label)`
    &:after {
        content: '\\b7';
        margin-left: ${spacing.xs};
    }
`;

export const Elevation = styled(Label)`
    margin-left: ${spacing.xs};
`;
