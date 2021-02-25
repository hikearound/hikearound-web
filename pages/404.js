import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../layouts/main';
import { Card } from '../styles/card';

const ErrorPage = () => {
    const { t } = useTranslation('error');

    const renderMainColumn = () => {
        return <Card>{t('message.error.generic')}</Card>;
    };

    return <Page title={t('title')} mainColumn={renderMainColumn()} />;
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'error',
                'header',
                'footer',
            ])),
        },
    };
}

export default ErrorPage;
