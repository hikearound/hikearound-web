import styled from 'styled-components';
import { colors } from '@constants/colors';
import { fontSize } from '@constants/type';
import { device } from '@constants/breakpoints';

export const SuggestionWrapper = styled.div`
    display: block;
    margin: 0;
`;

export const NameWrapper = styled.div`
    display: block;
    font-size: ${fontSize.md};
`;

export const LocationWrapper = styled.div`
    display: block;
    margin-top: 2px;
    color: ${colors.grayMedium};

    span {
        font-size: ${fontSize.sm};
    }
`;

export const SearchIconWrapper = styled.div`
    display: none;
    background-color: ${colors.purpleLight};
    height: 30px;
    width: 30px;
    border-radius: 100%;
    position: absolute;
    top: 10px;
    right: 10px;

    svg {
        position: relative;
        left: 8px;
        top: 7px;
    }

    @media ${device.tablet} {
        display: ${(props) =>
            props.shouldShowMobileInput ? 'none' : 'inline-block'};
    }
`;

export const CloseIconWrapper = styled.div`
    display: none;
    position: absolute;
    right: 17px;
    opacity: 0.9;

    @media ${device.tablet} {
        display: ${(props) =>
            props.shouldShowMobileInput ? 'inline-block' : 'none'};
    }
`;

export const SearchWrapper = styled.div`
    display: inline-block;

    @media ${device.tablet} {
        display: ${(props) =>
            props.shouldShowMobileInput ? 'inline-block' : 'none'};
    }
`;
