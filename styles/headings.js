import styled from 'styled-components';
import { colors } from '../constants/colors';
import { fontSize, fontWeight } from '../constants/type';
import { spacing } from '../constants/spacing';

export const PrimaryHeading = styled.h1`
    font-size: ${fontSize.xl};
    font-weight: ${fontWeight.medium};
`;

export const SecondaryHeading = styled.h2`
    font-size: ${fontSize.sm};
    font-weight: ${fontWeight.medium};
    color: ${colors.grayDark};
    text-transform: uppercase;
    padding: ${(props) => (props.isCard ? spacing.md : 0)};
`;

export const SubHeading = styled.h3`
    font-size: ${fontSize.md};
    font-weight: ${fontWeight.regular};
    color: ${colors.grayMedium};
`;
