import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { spacing } from '@constants/spacing';
import { colors } from '@constants/colors';
import { Card } from '@styles/card';
import { fontSize } from '@constants/type';

export const RatingWrapper = styled.div`
    margin: ${spacing.xs} 0 -2px 0;

    .MuiRating-label {
        .MuiRating-icon {
            font-size: 20px !important;
        }
    }
`;

export const PromptTitle = styled.div`
    font-size: ${fontSize.md};
    color: ${colors.blackText};
`;

export const PromptWrapper = styled(Card)`
    text-align: center;
`;

export const StyledRating = withStyles({
    iconFilled: {
        color: colors.purple,
    },
    iconEmpty: {
        color: colors.gray,
    },
    root: {
        opacity: '1 !important',
    },
})(Rating);

export const StyledTitle = withStyles({
    root: {
        paddingBottom: '0',
    },
})(DialogTitle);

export const StyledText = withStyles({
    root: {
        marginBottom: spacing.md,
    },
})(DialogContentText);

export const StyledButton = withStyles({
    root: {
        textTransform: 'none',
        fontSize: spacing.md,
    },
})(Button);
