import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as Sentry from '@sentry/browser';
import { MapkitProvider } from 'react-mapkit';
import Fire from '../lib/db';

import '../css/reset.css';
import '../css/nprogress.css';

const theme = {};

Sentry.init({
    dsn: 'https://f627f33f82bf4244a649b11eca44988d@sentry.io/1876851',
});

class HikeAround extends App {
    async componentDidMount() {
        await new Fire();
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <MapkitProvider tokenOrCallback={process.env.mapkitToken}>
                    <Component {...pageProps} />
                </MapkitProvider>
            </ThemeProvider>
        );
    }
}

export default HikeAround;
