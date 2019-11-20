import styled from 'styled-components';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import { borderRadius } from '../constants/dimensions';

export const Card = styled.div`
    background-color: ${colors.white};
    border: 1px solid ${colors.gray};
    border-radius: ${borderRadius.sm};
    padding: ${spacing.md};
`;

export default { Card };
