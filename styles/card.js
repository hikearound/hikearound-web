import styled from 'styled-components';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import { borderRadius } from '../constants/dimensions';
import { device } from '../constants/breakpoints';

export const Card = styled.div`
    background-color: ${colors.white};
    border: 1px solid ${colors.gray};
    border-radius: ${borderRadius.sm};
    padding: ${spacing.md};
    margin-bottom: ${spacing.md};

    @media ${device.tablet} {
        border-radius: 0;
        border: none;
        border-bottom: 3px solid ${colors.grayLight};
        margin-bottom: 0;
    }
`;

export default { Card };
