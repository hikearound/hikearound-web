import React from 'react';
import PropTypes from 'prop-types';
import PageBase from '../components/PageBase';
import { getPageData } from '../utils/page';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    contentOnly: PropTypes.string,
};

const defaultProps = {
    contentOnly: false,
};

class PrivacyPage extends React.PureComponent {
    static async getInitialProps(context) {
        const { req, query } = context;
        const page = await getPageData(req, 'privacy');

        return {
            title: page.data.title,
            description: page.data.description,
            contentOnly: query.contentOnly,
        };
    }

    render() {
        const { title, description, contentOnly } = this.props;

        if (contentOnly) {
            return (
                <PageBase
                    title={title}
                    description={description}
                    hideHeader
                    hideFooter
                />
            );
        }

        return <PageBase title={title} description={description} />;
    }
}

PrivacyPage.propTypes = propTypes;
PrivacyPage.defaultProps = defaultProps;

export default PrivacyPage;
