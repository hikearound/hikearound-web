import React from 'react';
import PropTypes from 'prop-types';
import Prismic from 'prismic-javascript';
import { apiEndpoint } from '../config/prismic';
import Page from '../layouts/main';
import PageContent from '../components/PageContent';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
};

class AboutPage extends React.Component {
    static async getInitialProps(context) {
        const { req } = context;
        const page = await this.getAboutPage(req);

        return {
            title: page.data.title,
            description: page.data.description,
        };
    }

    static async getAboutPage(req) {
        const data = await Prismic.getApi(apiEndpoint, req);
        return data.getSingle('about');
    }

    renderMainColumn() {
        const { title, description } = this.props;
        return <PageContent title={title} description={description} />;
    }

    render() {
        return <Page title='About' mainColumn={this.renderMainColumn()} />;
    }
}

AboutPage.propTypes = propTypes;

export default AboutPage;
