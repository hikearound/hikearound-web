import App from 'next/app';
import React from 'react';
import { Reset } from 'styled-reset';
import { ThemeProvider } from 'styled-components';

const theme = {};

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <Reset />
                <Component {...pageProps} />
            </ThemeProvider>
        );
    }
}

export default MyApp;
