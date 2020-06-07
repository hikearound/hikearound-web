import App from 'next/app';
import React from 'react';
import { MapkitProvider } from 'react-mapkit';
import { ThemeProvider } from '@material-ui/core/styles';
import { ToastProvider } from 'react-toast-notifications';
import Fire from '../lib/db';
import Toast from '../components/Toast';
import { getTheme, initializeSentry } from '../utils/app';
import { settings } from '../constants/toast';

import '../css/reset.css';
import '../css/global.css';

initializeSentry();

class HikeAround extends App {
    async componentDidMount() {
        await new Fire();
    }

    render() {
        const { Component, pageProps } = this.props;
        const theme = getTheme();

        return (
            <ToastProvider
                autoDismiss
                autoDismissTimeout={settings.autoDismissTimeout}
                placement={settings.placement}
                components={{ Toast }}
            >
                <ThemeProvider theme={theme}>
                    <MapkitProvider tokenOrCallback={process.env.mapkitToken}>
                        <Component {...pageProps} />
                    </MapkitProvider>
                </ThemeProvider>
            </ToastProvider>
        );
    }
}

export default HikeAround;
