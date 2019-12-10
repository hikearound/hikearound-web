import React from 'react';
import PropTypes from 'prop-types';
import Prismic from 'prismic-javascript';
import { apiEndpoint } from '../config/prismic';
import PageBase from '../components/PageBase';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
};

class ContactPage extends React.Component {
    static async getInitialProps(context) {
        const { req } = context;
        const page = await this.getPageData(req);

        return {
            title: page.data.title,
            description: page.data.description,
        };
    }

    static async getPageData(req) {
        const data = await Prismic.getApi(apiEndpoint, req);
        return data.getSingle('contact');
    }

    render() {
        const { title, description } = this.props;
        return <PageBase title={title} description={description} />;
    }
}

ContactPage.propTypes = propTypes;

export default ContactPage;
