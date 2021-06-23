import styled from 'styled-components';
import { colors } from '@constants/colors';
import { spacing } from '@constants/spacing';
import { fontSize, lineHeight } from '@constants/type';
import { device } from '@constants/breakpoints';

export const ContentSection = styled.div`
    text-align: center;
    margin: 0 auto;
    font-size: ${spacing.md};

    a {
        color: ${colors.purple};
    }

    @media ${device.tablet} {
        padding: 0 ${spacing.md};
    }
`;

export const ContentTitle = styled.h2`
    display: block;
    width: 100%;
    font-size: ${fontSize.xxl};
    font-weight: bold;
    line-height: ${lineHeight.lh_12};

    @media ${device.tablet} {
        font-size: 26px;
    }
`;

export const ContentDescription = styled.span`
    display: block;
    font-size: ${fontSize.md};
    line-height: ${lineHeight.lh_13};
    color: ${colors.grayDark};
`;
