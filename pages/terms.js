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

const RootView = styled.div`
    h1 {
        margin-bottom: ${spacing.md};
    }
`;
