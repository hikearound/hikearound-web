import styled from 'styled-components';
import { colors, transparentColors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { borderRadius } from '../constants/dimensions';
import { fontSize, fontWeight } from '../constants/type';
import { device } from '../constants/breakpoints';

const cardMargin = '10px';

export const CarouselCard = styled.a`
    box-shadow: 0 2px ${spacing.xs} 0 ${transparentColors.gray};
    height: 225px;
    width: 100%;
    margin: 40px ${cardMargin} 80px ${cardMargin};
    border-radius: ${borderRadius.sm};
    background-color: ${colors.gray};
    position: relative;
    overflow: hidden;

    &:hover {
        cursor: pointer;

        .cardBackground {
            transform: scale(1.2);
        }
    }

    @media ${device.tablet} {
        height: 200px;
        margin-bottom: 40px;

        &:hover {
            .cardBackground {
                transform: scale(1);
            }
        }
    }
`;

export const CardInterior = styled.div`
    height: 100%;
    width: 100%;
    border-radius: ${borderRadius.sm};
    background-image: ${(props) => `url(${props.image})`};
    background-size: cover;
    background-position: center;
    transition: transform 0.5s;
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
