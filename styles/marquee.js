import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import { colors, transparentColors } from '@constants/colors';
import { spacing } from '@constants/spacing';
import { borderRadius } from '@constants/dimensions';
import { fontSize, fontWeight } from '@constants/type';
import { device } from '@constants/breakpoints';

const cardMargin = '10px';

export const StyledRating = withStyles({
    iconFilled: {
        color: colors.white,
    },
    iconEmpty: {
        color: colors.white,
    },
    root: {
        opacity: '1 !important',
    },
})(Rating);

export const MarqueeCard = styled.a`
    box-shadow: 0 2px ${spacing.xs} 0 ${transparentColors.gray};
    height: 225px;
    width: 350px;
    margin: 40px ${cardMargin} 80px ${cardMargin};
    border-radius: ${borderRadius.sm};
    background-color: ${colors.grayMediumLight};
    position: relative;
    overflow: hidden;
    opacity: ${(props) => (props.didLoad ? 1 : 0)};
    transition: opacity 0.25s ease-in;

    &:hover {
        cursor: pointer;
    }

    @media ${device.tablet} {
        height: 200px;
        width: 300px;
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
        rgba(0, 0, 0, 0) 40%,
        rgba(0, 0, 0, 0.95) 98%
    );
    border-radius: ${borderRadius.sm};
`;

export const Name = styled.div`
    display: block;
    font-size: ${fontSize.lg};
    color: ${colors.white};
    font-weight: ${fontWeight.medium};
    margin-bottom: 3px;
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

export const RatingWrapper = styled.div`
    display: block;
`;

export const RatingText = styled.div`
    display: inline-block;
    color: ${colors.white};
    font-size: ${fontSize.sm};
    position: relative;
    top: -3px;
    margin-left: 3px;
`;
