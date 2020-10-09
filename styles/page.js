import styled from 'styled-components';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { fontWeight, fontSize, lineHeight } from '../constants/type';

export const RootView = styled.div`
    line-height: ${lineHeight.lh_13};

    h4 {
        margin-bottom: ${spacing.md};
        color: ${colors.grayDark};
    }

    h5 {
        font-size: ${fontSize.lg};
    }

    h6 {
        font-size: 16px;
    }

    h5,
    h6 {
        margin-bottom: ${spacing.sm};
    }

    p {
        margin-bottom: ${spacing.md};

        &:last-of-type {
            margin: 0;
        }
    }

    strong {
        font-weight: ${fontWeight.medium};
    }

    ul {
        display: block;
        list-style-type: disc;
        margin-top: ${spacing.sm};
        margin-bottom: ${spacing.md};
        padding-left: ${spacing.lg};

        li {
            margin-top: ${spacing.sm};
        }
    }

    a {
        color: ${colors.purple};
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }

        &.anchor {
            position: relative;
            visibility: hidden;
            top: -50px;
        }
    }
`;

export default RootView;
