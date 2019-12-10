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
        return <Page title='About' mainColumn={this.renderMainColumn()} />;
    }
}

AboutPage.propTypes = propTypes;

export default AboutPage;

const RootView = styled.div`
    h1 {
        margin-bottom: ${spacing.md};
    }
`;
