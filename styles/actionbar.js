import styled from 'styled-components';
import { colors } from '@constants/colors';
import { spacing } from '@constants/spacing';
import { borderRadius } from '@constants/dimensions';
import { Card } from '@styles/card';
import { fontSize } from '@constants/type';

export const ActionBarWrapper = styled(Card)`
    padding: 0;
    min-height: 45px;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    a {
        text-decoration: none;
    }

    .MuiButton-root {
        border-radius: 0;
        text-transform: none;
        color: ${colors.blackText};

        span {
            font-size: 14px;
        }

        &.firstChild {
            border-bottom-left-radius: ${borderRadius.sm};
        }
    }

    .MuiButton-text {
        padding: 10.5px 18px;
    }

    .MuiButton-startIcon {
        margin-right: ${spacing.xs};
    }
`;

export const menuStyle = {
    item: {
        fontSize: fontSize.md,
        color: colors.blackText,
    },
};
