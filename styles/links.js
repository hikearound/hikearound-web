import styled from 'styled-components';
import { colors } from '@constants/colors';
import { spacing } from '@constants/spacing';
import { fontSize, lineHeight } from '@constants/type';
import { device } from '@constants/breakpoints';

export const RightRailLink = styled.a`
    display: inline-block;
    color: ${colors.grayDark};
    line-height: ${lineHeight.lh_13};
    cursor: pointer;
    text-decoration: none;
    margin-right: ${spacing.sm};
    font-size: ${fontSize.sm};

    &:hover {
        text-decoration: underline;
    }

    @media ${device.tablet} {
        font-size: ${fontSize.md};
        margin-right: 12px;
    }
`;

export default { RightRailLink };
