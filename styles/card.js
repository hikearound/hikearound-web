import styled from 'styled-components';
import { colors } from '@constants/colors';
import { spacing } from '@constants/spacing';
import { borderRadius, gutterWidth } from '@constants/dimensions';
import { lineHeight, fontSize } from '@constants/type';
import { device } from '@constants/breakpoints';

export const Card = styled.div`
    background-color: ${colors.white};
    border: 1px solid ${colors.gray};
    border-radius: ${borderRadius.sm};
    padding: ${(props) => (props.noPadding ? 0 : spacing.md)};
    margin-bottom: ${(props) => (props.lastChild ? '34px' : spacing.md)};
    min-height: 20px;

    @media ${device.tablet} {
        border-radius: 0;
        border: none;
        border-bottom: solid ${colors.grayLight};
        border-width: ${(props) => (props.hideGutter ? 0 : gutterWidth.mobile)};
        margin-bottom: 0;
        display: ${(props) => (props.hideMobile ? 'none' : 'block')};
    }
`;

export const CardContent = styled.div`
    border-top: 1px solid ${colors.gray};
    padding: ${spacing.md};
    padding-right: ${(props) => (props.fullWidth ? '0' : spacing.md)};
    line-height: ${lineHeight.lh_13};
    min-height: ${(props) => (props.includeMinHeight ? '90px' : 'initial')};

    @media ${device.tablet} {
        border-top: ${gutterWidth.mobile} solid ${colors.grayLight};
        font-size: ${fontSize.sm};
    }
`;

export const GenericCardContent = styled.div`
    line-height: ${lineHeight.lh_13};
`;

export const BlankCard = styled(GenericCardContent)`
    display: block;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 ${spacing.md};
`;
