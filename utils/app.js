import { createMuiTheme } from '@material-ui/core/styles';
import * as Sentry from '@sentry/browser';
import { typeface } from '../constants/type';

export function getTheme() {
    const theme = createMuiTheme({
        typography: {
            fontFamily: typeface.sansSerif,
        },
    });
    return theme;
}

export function initializeSentry() {
    Sentry.init({
        dsn: 'https://f627f33f82bf4244a649b11eca44988d@sentry.io/1876851',
    });
}
