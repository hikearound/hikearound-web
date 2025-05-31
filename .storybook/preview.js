import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { initializeApp } from 'firebase/app';
import getTheme from '../utils/app';
import { GlobalStyle } from '../styles/layout';
import '../css/reset.css';
import '../scss/components/_index.scss';

// Initialize Firebase for Storybook
const firebaseConfig = {
    apiKey: 'storybook-api-key',
    authDomain: 'storybook.firebaseapp.com',
    projectId: 'storybook',
    storageBucket: 'storybook.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abcdef',
    measurementId: 'G-ABCDEF',
};

// Initialize Firebase before any stories are rendered
initializeApp(firebaseConfig);

// Mock data for featured hikes
const mockHikes = [
    {
        name: 'Mount Tamalpais Loop',
        city: 'Mill Valley',
        state: 'CA',
        review: {
            average: 4.5,
            count: 128,
        },
        coverPhoto:
            'https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        distance: 7.2,
        elevation: 2500,
        difficulty: 'Moderate',
        hid: 'mt-tam-loop',
    },
    {
        name: 'Dipsea Trail',
        city: 'Stinson Beach',
        state: 'CA',
        review: {
            average: 4.8,
            count: 256,
        },
        coverPhoto:
            'https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        distance: 7.4,
        elevation: 2200,
        difficulty: 'Hard',
        hid: 'dipsea-trail',
    },
    {
        name: 'Muir Woods Loop',
        city: 'Mill Valley',
        state: 'CA',
        review: {
            average: 4.7,
            count: 189,
        },
        coverPhoto:
            'https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        distance: 2.1,
        elevation: 500,
        difficulty: 'Easy',
        hid: 'muir-woods-loop',
    },
];

// Mock the hike utility
const mockHikeUtils = {
    getFeaturedHikes: async () => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return mockHikes;
    },
};

// Add module mocking
if (typeof window !== 'undefined') {
    window.__STORYBOOK_MODULE_MOCKS__ = window.__STORYBOOK_MODULE_MOCKS__ || {};
    window.__STORYBOOK_MODULE_MOCKS__['utils/hike'] = mockHikeUtils;
}

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
