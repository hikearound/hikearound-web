import styled from 'styled-components';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { fontSize } from '../constants/type';
import { SecondaryHeading } from './headings';
import { device } from '../constants/breakpoints';
import { gutterWidth } from '../constants/dimensions';

export const OrderedList = styled.ol`
    padding: 0 ${spacing.md} ${spacing.md} ${spacing.md};
    font-size: ${fontSize.sm};
    color: ${colors.grayDark};
    list-style-type: ${(props) => (props.showDecimals ? 'decimals' : 'none')};
    list-style-position: inside;

    @media ${device.tablet} {
        border-top: ${gutterWidth.mobile} solid ${colors.grayLight};
        padding-top: ${spacing.md};
    }
`;

export const UnorderedList = styled.ul`
    padding: 0 ${spacing.md} ${spacing.md} ${spacing.md};
    font-size: ${fontSize.sm};
    color: ${colors.grayDark};

    @media ${device.tablet} {
        border-top: ${gutterWidth.mobile} solid ${colors.grayLight};
        padding-top: ${spacing.md};
    }
`;

export const ListItem = styled.li`
    margin-top: ${spacing.xs};

    &:first-child {
        margin-top: 0;
    }
`;

export const ListHeading = styled(SecondaryHeading)`
    padding: ${spacing.md} ${spacing.md} ${spacing.sm} ${spacing.md};

    @media ${device.tablet} {
        padding-bottom: ${spacing.md};
    }
`;
