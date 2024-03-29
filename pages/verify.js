import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Page from '@layouts/main';
import Confirmation from '@components/verify/Confirmation';
import { fetcher } from '@utils/pages/verify';
import ExternalPage from '@components/ExternalPage';

const VerifyPage = function () {
    const router = useRouter();
    const { t } = useTranslation('verify');
    const { data } = useSWR(['/api/verify', router.query.token], fetcher);

    const renderMainColumn = () => (
        <ExternalPage component={<Confirmation data={data} />} />
    );

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
                'common',
                'header',
                'footer',
            ])),
        },
    };
}

export default VerifyPage;
