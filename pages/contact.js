import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import { apiEndpoint } from '../config/prismic';
import Page from '../layouts/main';
import { PrimaryHeading } from '../styles/headings';
import { Card } from '../styles/card';
import spacing from '../constants/spacing';

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

        return (
            <RootView>
                <Card>
                    <PrimaryHeading>{RichText.asText(title)}</PrimaryHeading>
                    <RichText render={description} />
                </Card>
            </RootView>
        );
    }

    render() {
        return <Page title='Contact Us' mainColumn={this.renderMainColumn()} />;
    }
}

ContactPage.propTypes = propTypes;

export default ContactPage;

const RootView = styled.div`
    h1 {
        margin-bottom: ${spacing.md};
    }
`;
