import styled from 'styled-components';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { fontWeight, lineHeight } from '../constants/type';

export const RootView = styled.div`
    line-height: ${lineHeight.lh_13};

    h4 {
        margin-bottom: ${spacing.md};
        color: ${colors.grayDark};
    }

    h5 {
        font-size: ${spacing.md};
    }

    p {
        margin-bottom: ${spacing.md};

        &:last-of-type {
            margin: 0;
        }
    }

    strong {
        font-weight: ${fontWeight.bold};
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
