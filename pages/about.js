import React from 'react';
import PropTypes from 'prop-types';
import PageBase from '../components/PageBase';
import { getPageData } from '../utils/page';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    pageType: PropTypes.string,
};

const defaultProps = {
    pageType: 'about',
};

class AboutPage extends React.Component {
    static async getInitialProps(context) {
        const { req } = context;
        const page = await getPageData(req, 'about');

        return {
            title: page.data.title,
            description: page.data.description,
            namespacesRequired: ['common', 'header', 'footer'],
        };
    }

    render() {
        const { title, description, pageType } = this.props;
        return (
            <PageBase
                title={title}
                description={description}
                pageType={pageType}
            />
        );
    }
}

AboutPage.propTypes = propTypes;
AboutPage.defaultProps = defaultProps;

export default AboutPage;
