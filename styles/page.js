import styled, { createGlobalStyle } from 'styled-components';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { fontWeight, fontSize, lineHeight } from '../constants/type';
import { device } from '../constants/breakpoints';

export const RootView = styled.div`
    width: 100%;
    text-align: center;
    line-height: ${lineHeight.lh_13};

    h1 {
        display: block;
        width: 100%;
        font-size: ${fontSize.xxl};
        font-weight: bold;
        line-height: ${lineHeight.lh_12};

        @media ${device.tablet} {
            font-size: 26px;
        }
    }

    h4 {
        margin-bottom: ${spacing.md};
        color: ${colors.grayDark};
    }

    h5 {
        margin-top: 32px;
        font-size: ${fontSize.xl};
    }

    h6 {
        margin-top: 24px;
        font-size: ${fontSize.lg};
    }

    h5,
    h6 {
        margin-bottom: ${spacing.sm};
    }

    p {
        margin-bottom: ${spacing.md};

        &:last-of-type {
            margin: 0;
        }
    }

    strong {
        font-weight: ${fontWeight.medium};
    }

    ul {
        display: block;
        list-style-type: disc;
        margin-top: ${spacing.sm};
        margin-bottom: ${spacing.md};
        padding-left: ${spacing.lg};

        li {
            margin-top: ${spacing.sm};
        }
    }

    p {
        color: ${colors.blackText};
        margin-bottom: ${spacing.md};

        &:last-of-type {
            margin: 0;
        }
    }
`;

export const GenericRootView = styled(RootView)`
    background-color: white;
    text-align: left;
    margin-top: 100px;

    h1 {
        font-size: ${fontSize.xl};
        font-weight: ${fontWeight.medium};
    }

    @media ${device.tablet} {
        margin-top: ${spacing.lg};
    }
`;

export const WhiteBackground = createGlobalStyle`
    body {
        background-color: ${colors.white};
    }
`;
