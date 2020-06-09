import App from 'next/app';
import React from 'react';
import { MapkitProvider } from 'react-mapkit';
import { ThemeProvider } from '@material-ui/core/styles';
import { ToastProvider } from 'react-toast-notifications';
import SimpleReactLightbox from 'simple-react-lightbox';
import Fire from '../lib/db';
import Toast from '../components/Toast';
import { getTheme, initializeSentry } from '../utils/app';
import { settings } from '../constants/toast';

import '../css/reset.css';
import '../scss/components/_index.scss';

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
                        <SimpleReactLightbox>
                            <Component {...pageProps} />
                        </SimpleReactLightbox>
                    </MapkitProvider>
                </ThemeProvider>
            </ToastProvider>
        );
    }
}

export default HikeAround;
