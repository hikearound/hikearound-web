import styled from 'styled-components';
import { borderRadius } from '../constants/dimensions';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { fontSize } from '../constants/type';

export const GenericPill = styled.div`
    margin-left: 6px;
    background-color: ${colors.white};
    border-radius: ${borderRadius.sm};
    color: ${colors.blackText};
    font-size: ${fontSize.sm};
    display: inline-block;
    padding: ${spacing.xs} 6px;
`;

export const ColorPill = styled(GenericPill)`
    color: ${colors.white};
`;
