import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as Sentry from '@sentry/browser';
import Fire from '../lib/db';

const theme = {};

Sentry.init({
    dsn: 'https://f627f33f82bf4244a649b11eca44988d@sentry.io/1876851',
});

class HikeAround extends App {
    async componentDidMount() {
        await new Fire();
    }

    componentDidCatch(error, errorInfo) {
        super.componentDidCatch(error, errorInfo);

        Sentry.withScope((scope) => {
            Object.keys(errorInfo).forEach((key) => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        );
    }
}

export default HikeAround;
