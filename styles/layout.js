import styled, { createGlobalStyle } from 'styled-components';
import { typeface, fontSize } from '../constants/type';
import { grid, offsets } from '../constants/dimensions';
import { colors } from '../constants/colors';
import { device } from '../constants/breakpoints';

export const GlobalStyle = createGlobalStyle`
    body {
        background: ${colors.grayUltraLight};
        color: ${colors.blackText};
        font-family: ${typeface.sansSerif};

        @media ${device.tablet} {
            background: ${colors.white};
        }
    }

    div, span {
        font-size: ${fontSize.md};
    }
`;

export const ContentGrid = styled.div`
    max-width: ${(props) => (props.fullWidth ? '100%' : grid.main)};
    padding: ${(props) =>
        props.fullWidth
            ? 0
            : `${offsets.header} ${grid.gutter} 0 ${grid.gutter}`};
    margin: 0 auto;
    vertical-align: top;
    display: flex;

    @media ${device.tablet} {
        flex-direction: column;
        padding: ${grid.header} 0 0 0;
        padding-top: ${(props) => (props.hideHeader ? 0 : grid.header)};
    }
`;

export const MainColumn = styled.div`
    width: ${(props) => (props.singleColumn ? grid.main : grid.centerCol)};
    display: inline-block;

    @media ${device.tablet} {
        width: 100%;
    }
`;

export const FullWidthMainColumn = styled.div`
    display: inline-block;
    width: 100%;
`;

export const StickyContainer = styled.div`
    position: sticky;
    top: ${offsets.header};
    margin-bottom: 34px;

    @media ${device.tablet} {
        margin-bottom: 0;
    }
`;

export const RightColumn = styled.div`
    width: ${grid.rightCol};
    min-width: ${grid.rightCol};
    display: inline-block;
    margin-left: ${grid.gutter};

    @media ${device.tablet} {
        width: 100%;
        margin-left: 0;
    }
`;
