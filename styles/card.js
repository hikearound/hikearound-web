import styled from 'styled-components';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import { borderRadius } from '../constants/dimensions';
import { device } from '../constants/breakpoints';

export const Card = styled.div`
    background-color: ${colors.white};
    border: 1px solid ${colors.gray};
    border-radius: ${borderRadius.sm};
    padding: ${(props) => (props.noPadding ? 0 : spacing.md)};
    margin-bottom: ${spacing.md};

    @media ${device.tablet} {
        border-radius: 0;
        border: none;
        border-bottom: solid ${colors.grayLight};
        border-width: ${(props) => (props.hideGutter ? 0 : '3px')};
        margin-bottom: 0;
    }
`;

export default { Card };
