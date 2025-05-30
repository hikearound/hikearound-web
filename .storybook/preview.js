import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from '../utils/app';
import { GlobalStyle } from '../styles/layout';
import '../css/reset.css';
import '../scss/components/_index.scss';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    nextjs: {
        appDirectory: true,
    },
};

export const decorators = [
    (Story) => (
        <ThemeProvider theme={getTheme()}>
            <GlobalStyle />
            <Story />
        </ThemeProvider>
    ),
];
