import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../layouts/main';
import { BlankCard } from '../styles/card';
import FooterSection from '../components/landing/section/Footer';
import { GenericRootView, WhiteBackground } from '../styles/page';

const ErrorPage = () => {
    const { t } = useTranslation('error');

    const renderMainColumn = () => {
        return (
            <GenericRootView>
                <WhiteBackground />
                <BlankCard>{t('message.error.generic')}</BlankCard>
                <FooterSection centered topBorder />
            </GenericRootView>
        );
    };

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
                'error',
                'header',
                'footer',
            ])),
        },
    };
}

export default ErrorPage;
