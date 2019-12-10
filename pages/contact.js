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

class ContactPage extends React.Component {
    static async getInitialProps(context) {
        const { req } = context;
        const page = await this.getContactPage(req);

        return {
            title: page.data.title,
            description: page.data.description,
        };
    }

    static async getContactPage(req) {
        const data = await Prismic.getApi(apiEndpoint, req);
        return data.getSingle('contact');
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

ContactPage.propTypes = propTypes;

export default ContactPage;
