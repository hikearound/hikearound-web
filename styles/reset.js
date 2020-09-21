import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';

export const formStyle = () => ({
    root: {
        marginTop: '24px',
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: colors.grayMedium,
            },
            '&.Mui-focused fieldset': {
                borderColor: colors.purple,
            },
        },
        '& .MuiFormHelperText-root': {
            color: colors.redLight,
        },
    },
    textField: {
        display: 'flex',
        maxWidth: '250px',
        marginTop: spacing.sm,
    },
    button: {
        textTransform: 'none',
        marginTop: spacing.sm,
    },
});

export default formStyle;
