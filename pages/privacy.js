import React from 'react';
import PropTypes from 'prop-types';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import { apiEndpoint } from '../config/prismic';
import Page from '../layouts/main';
import PageContent from '../components/PageContent';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
};

class PrivacyPage extends React.Component {
    static async getInitialProps(context) {
        const { req } = context;
        const page = await this.getPrivacyPage(req);

        return {
            title: page.data.title,
            description: page.data.description,
        };
    }

    static async getPrivacyPage(req) {
        const data = await Prismic.getApi(apiEndpoint, req);
        return data.getSingle('privacy');
    }

    renderMainColumn() {
        const { title, description } = this.props;
        return <PageContent title={title} description={description} />;
    }

    render() {
        const { title } = this.props;
        return (
            <Page
                title={RichText.asText(title)}
                mainColumn={this.renderMainColumn()}
            />
        );
    }
}

PrivacyPage.propTypes = propTypes;

export default PrivacyPage;
