import React from 'react';
import PropTypes from 'prop-types';
import PageBase from '../components/PageBase';
import { getPageData } from '../utils/page';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
};

class PrivacyPage extends React.PureComponent {
    static async getInitialProps(context) {
        const { req } = context;
        const page = await getPageData(req, 'privacy');

        return {
            title: page.data.title,
            description: page.data.description,
        };
    }

    render() {
        const { title, description } = this.props;
        return <PageBase title={title} description={description} />;
    }
}

PrivacyPage.propTypes = propTypes;

export default PrivacyPage;
