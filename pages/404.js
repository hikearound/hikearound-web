import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../layouts/main';
import { BlankCard } from '../styles/card';
import ExternalPage from '../components/ExternalPage';

const ErrorPage = () => {
    const { t } = useTranslation('error');

    const errorMessage = () => (
        <BlankCard>{t('message.error.generic')}</BlankCard>
    );

    const renderMainColumn = () => <ExternalPage component={errorMessage()} />;

    return (
        <Page
            singleColumn
            fullWidth
            title={t('title')}
            mainColumn={renderMainColumn()}
        />
    );
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'error',
                'header',
                'footer',
            ])),
        },
    };
}

export default ErrorPage;
