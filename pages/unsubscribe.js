import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Page from '@layouts/main';
import Confirmation from '@components/unsubscribe/Confirmation';
import { fetcher } from '@utils/pages/unsubscribe';
import ExternalPage from '@components/ExternalPage';

const UnsubscribePage = () => {
    const router = useRouter();
    const { t } = useTranslation('unsubscribe');

    const { data } = useSWR(
        ['/api/unsubscribe', router.query.token, router.query.type],
        fetcher,
    );

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
                'unsubscribe',
                'notifications',
                'header',
                'footer',
                'common',
            ])),
        },
    };
}

export default UnsubscribePage;
