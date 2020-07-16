import App from 'next/app';
import React from 'react';
import { MapkitProvider } from 'react-mapkit';
import { ThemeProvider } from '@material-ui/core/styles';
import { ToastProvider } from 'react-toast-notifications';
import SimpleReactLightbox from 'simple-react-lightbox';
import Toast from '../components/Toast';
import { getTheme, initializeSentry } from '../utils/app';
import { settings } from '../constants/toast';
import { initFirebase } from '../utils/auth/init';

import '../css/reset.css';
import '@brainhubeu/react-carousel/lib/style.css';
import '../scss/components/_index.scss';

const { NEXT_PUBLIC_MAPKIT_TOKEN } = process.env;

initializeSentry();
initFirebase();

class HikeAround extends App {
    render() {
        const { Component, pageProps, err } = this.props;
        const theme = getTheme();

        return (
            <ToastProvider
                autoDismiss
                autoDismissTimeout={settings.autoDismissTimeout}
                placement={settings.placement}
                components={{ Toast }}
            >
                <ThemeProvider theme={theme}>
                    <MapkitProvider tokenOrCallback={NEXT_PUBLIC_MAPKIT_TOKEN}>
                        <SimpleReactLightbox>
                            <Component {...pageProps} err={err} />
                        </SimpleReactLightbox>
                    </MapkitProvider>
                </ThemeProvider>
            </ToastProvider>
        );
    }
}

export default HikeAround;
