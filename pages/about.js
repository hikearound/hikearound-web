import React from 'react';
import PropTypes from 'prop-types';
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

class AboutPage extends React.Component {
    static async getInitialProps(context) {
        const { req } = context;
        const page = await getPageData(req, 'about');

        return {
            title: page.data.title,
            description: page.data.description,
            namespacesRequired: ['about', 'common', 'header', 'footer'],
        };
    }

    renderMainColumn = () => {
        const { title, description } = this.props;

        return (
            <RootView>
                <IntroSection title={title} description={description} />
                <MapSection />
                <FooterSection />
            </RootView>
        );
    };

    render() {
        const { title } = this.props;

        return (
            <Page
                singleColumn
                fullWidth
                title={RichText.asText(title)}
                mainColumn={this.renderMainColumn()}
            />
        );
    }
}

AboutPage.propTypes = propTypes;

export default AboutPage;
