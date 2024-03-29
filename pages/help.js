import React from 'react';
import { RichText } from 'prismic-reactjs';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '@layouts/main';
import { getPageData } from '@utils/page';
import { RootView } from '@styles/page';
import FooterSection from '@components/landing/section/Footer';
import DescriptionSection from '@components/terms/section/Description';

const propTypes = {
    title: PropTypes.array.isRequired,
    introduction: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    contentOnly: PropTypes.bool.isRequired,
};

const HelpPage = function ({ title, description, introduction, contentOnly }) {
    const renderMainColumn = () => (
        <RootView>
            <DescriptionSection
                title={title}
                description={description}
                introduction={introduction}
            />
            {!contentOnly && <FooterSection centered />}
        </RootView>
    );

    return (
        <Page
            singleColumn
            fullWidth
            title={RichText.asText(title)}
            mainColumn={renderMainColumn()}
            hideHeader={contentOnly}
            hideFooter={contentOnly}
        />
    );
};

export async function getServerSideProps({ req, query, locale }) {
    const page = await getPageData(req, locale, 'help');

    if (!query.contentOnly) {
        query.contentOnly = false;
    }

    return {
        props: {
            title: page.data.title,
            introduction: page.data.introduction,
            description: page.data.description,
            contentOnly: query.contentOnly,
            ...(await serverSideTranslations(locale, [
                'common',
                'header',
                'footer',
            ])),
        },
    };
}

HelpPage.propTypes = propTypes;

export default HelpPage;
