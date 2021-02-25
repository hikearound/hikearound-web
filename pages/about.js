import React from 'react';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RichText } from 'prismic-reactjs';
import Page from '../layouts/main';
import { getPageData } from '../utils/page';
import IntroSection from '../components/about/section/Intro';
import MapSection from '../components/about/section/Map';
import FooterSection from '../components/landing/section/Footer';
import { RootView } from '../styles/page';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
};

const AboutPage = ({ title, description }) => {
    const renderMainColumn = () => {
        return (
            <RootView>
                <IntroSection title={title} description={description} />
                <MapSection />
                <FooterSection centered />
            </RootView>
        );
    };

    return (
        <Page
            singleColumn
            fullWidth
            title={RichText.asText(title)}
            mainColumn={renderMainColumn()}
        />
    );
};

export async function getServerSideProps({ req, locale }) {
    const page = await getPageData(req, locale, 'about');

    return {
        props: {
            title: page.data.title,
            description: page.data.description,
            ...(await serverSideTranslations(locale, [
                'about',
                'common',
                'header',
                'footer',
            ])),
        },
    };
}

AboutPage.propTypes = propTypes;

export default AboutPage;
