import { createTheme } from '@material-ui/core/styles';
import { typeface } from '@constants/type';
import { colors } from '@constants/colors';

export default function getTheme() {
    const theme = createTheme({
        typography: {
            fontFamily: typeface.sansSerif,
        },
        palette: {
            primary: {
                main: colors.purple,
            },
        },
    });
    return theme;
}
