import styled from 'styled-components';
import { offsets } from '../constants/dimensions';
import { colors } from '../constants/colors';
import { device } from '../constants/breakpoints';
import { fontSize, componentSpacing } from '../constants/landing';
import { spacing } from '../constants/spacing';
import { lineHeight } from '../constants/type';

export const RootView = styled.div`
    width: 100%;
    text-align: center;
    overflow: hidden;
`;

export const Section = styled.div`
    background-color: ${(props) =>
        props.offset ? colors.grayUltraLight : colors.white};
    padding-top: ${(props) => (props.marginTop ? componentSpacing.xx : 0)};
    padding-bottom: ${(props) =>
        props.marginBottom ? componentSpacing.xx : 0};

    &:first-of-type {
        padding-top: ${offsets.header};
    }

    @media ${device.tablet} {
        padding-top: ${(props) => (props.marginTop ? componentSpacing.lg : 0)};
        padding-bottom: ${(props) =>
            props.marginBottom ? componentSpacing.lg : 0};

        &:first-of-type {
            padding-top: 0;
        }
    }
`;

export const SectionBlock = styled.div`
    max-width: 970px;
    min-height: 621px;
    margin: 0 auto;
    display: flex;
    padding: 0 ${componentSpacing.sm};

    @media ${device.tablet} {
        flex-direction: ${(props) => props.direction};
        max-width: 100%;
        padding: 0;
    }
`;

export const TextBlock = styled.div`
    padding: 0;
    margin: auto 0;
    position: relative;
    top: ${(props) => (props.offsetTop ? `-${spacing.lg}` : 0)};

    @media ${device.tablet} {
        top: 0;
        padding: ${(props) =>
            props.centered
                ? `0 ${componentSpacing.xl}`
                : `${componentSpacing.lg} ${componentSpacing.xl}`};
    }
`;

export const ContentBlock = styled.div`
    text-align: left;
    margin: auto 0;
    width: 90%;

    @media ${device.tablet} {
        width: 100%;
        margin: 0;
        text-align: center;
    }
`;

export const ContentTitle = styled.h2`
    display: block;
    width: 100%;
    font-size: ${fontSize.xl};
    font-weight: bold;
    line-height: ${lineHeight.lh_12};

    @media ${device.tablet} {
        font-size: ${fontSize.lg};
    }
`;

export const ContentDescription = styled.span`
    display: block;
    font-size: ${fontSize.md};
    margin-top: ${componentSpacing.xs};
    line-height: ${lineHeight.lh_13};
    color: ${colors.grayDark};
`;

export const ContentImage = styled.div`
    display: flex;
    align-items: flex-start;
    width: ${(props) => (props.justifyLeft ? '50%' : '60%')};
    justify-content: ${(props) => (props.justifyLeft ? 'left' : 'end')};

    @media ${device.tablet} {
        width: ${(props) => (props.inflate ? '120%' : '100%')};
        justify-content: center;
    }
`;
