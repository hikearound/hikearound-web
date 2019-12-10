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

class TermsPage extends React.Component {
    static async getInitialProps(context) {
        const { req } = context;
        const page = await this.getTermsPage(req);

        return {
            title: page.data.title,
            description: page.data.description,
        };
    }

    static async getTermsPage(req) {
        const data = await Prismic.getApi(apiEndpoint, req);
        return data.getSingle('terms');
    }

    renderMainColumn() {
        const { title, description } = this.props;
        return <PageContent title={title} description={description} />;
    }

    render() {
        return (
            <Page
                title='Terms of Service'
                mainColumn={this.renderMainColumn()}
            />
        );
    }
}

TermsPage.propTypes = propTypes;

export default TermsPage;
