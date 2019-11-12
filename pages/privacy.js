import React from 'react';
import PropTypes from 'prop-types';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import { apiEndpoint } from '../config/prismic';
import Page from '../layouts/main';

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

    render() {
        const { title, description } = this.props;

        return (
            <Page>
                <h1>
                    <RichText render={title} />
                </h1>
                <div>
                    <RichText render={description} />
                </div>
            </Page>
        );
    }
}

PrivacyPage.propTypes = propTypes;

export default PrivacyPage;
