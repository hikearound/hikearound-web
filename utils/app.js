import { createMuiTheme } from '@material-ui/core/styles';
import * as Sentry from '@sentry/node';
import { typeface } from '../constants/type';

export function getTheme() {
    const theme = createMuiTheme({
        typography: {
            fontFamily: typeface.sansSerif,
        },
    });
    return theme;
}

export function initSentry() {
    Sentry.init({
        enabled: process.env.NODE_ENV === 'production',
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    });
}
