import React from 'react';
import PropTypes from 'prop-types';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import { apiEndpoint } from '../config/prismic';
import Page from '../layouts/main';

const propTypes = {
    doc: PropTypes.object.isRequired,
};

class PrivacyPage extends React.Component {
    static async getInitialProps(context) {
        const { req } = context;
        const privacy = await this.getPrivacyPage(req);

        return {
            doc: privacy,
        };
    }

    static async getPrivacyPage(req) {
        const API = await Prismic.getApi(apiEndpoint, req);
        return API.getSingle('privacy');
    }

    render() {
        const { doc } = this.props;
        const { data } = doc;

        return (
            <Page>
                <h1>{RichText.asText(data.title)}</h1>
                <div>{RichText.asText(data.description)}</div>
            </Page>
        );
    }
}

PrivacyPage.propTypes = propTypes;

export default PrivacyPage;
