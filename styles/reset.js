import { colors } from '../constants/colors';

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
        maxWidth: '500px',
        marginTop: '12px',
    },
    button: {
        textTransform: 'none',
        marginTop: '12px',
    },
});

export default formStyle;
