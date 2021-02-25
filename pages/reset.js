import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Page from '../layouts/main';
import PasswordForm from '../components/reset/PasswordForm';
import { fetcher } from '../utils/pages/reset';
import FooterSection from '../components/landing/section/Footer';
import { GenericRootView, WhiteBackground } from '../styles/page';

const ResetPasswordPage = () => {
    const router = useRouter();
    const { t } = useTranslation('reset');
    const { data } = useSWR(['/api/reset', router.query.token], fetcher);

    const renderMainColumn = () => {
        return (
            <GenericRootView>
                <WhiteBackground />
                <PasswordForm data={data} />
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

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'reset',
                'header',
                'footer',
                'common',
            ])),
        },
    };
}

export default ResetPasswordPage;
