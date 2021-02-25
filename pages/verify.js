import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Page from '../layouts/main';
import Confirmation from '../components/verify/Confirmation';
import { fetcher } from '../utils/pages/verify';
import FooterSection from '../components/landing/section/Footer';
import { GenericRootView, WhiteBackground } from '../styles/page';

const VerifyPage = () => {
    const router = useRouter();
    const { t } = useTranslation('verify');
    const { data } = useSWR(['/api/verify', router.query.token], fetcher);

    const renderMainColumn = () => {
        return (
            <GenericRootView>
                <WhiteBackground />
                <Confirmation data={data} />
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
                'verify',
                'header',
                'footer',
            ])),
        },
    };
}

export default VerifyPage;
