import React from 'react';
import PropTypes from 'prop-types';
import PageBase from '../components/PageBase';
import { getPageData } from '../utils/page';
import TermsNavigation from '../components/tos/Navigation';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    contentOnly: PropTypes.bool,
};

const defaultProps = {
    contentOnly: false,
};

class TermsPage extends React.Component {
    static async getInitialProps(context) {
        const { req, query } = context;
        const page = await getPageData(req, 'terms');

        return {
            title: page.data.title,
            description: page.data.description,
            contentOnly: query.contentOnly,
            namespacesRequired: ['terms', 'common', 'header', 'footer'],
        };
    }

    renderStickyRightColumn = () => {
        return <TermsNavigation />;
    };

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

        return (
            <PageBase
                title={title}
                description={description}
                rightColumnSticky={this.renderStickyRightColumn()}
            />
        );
    }
}

TermsPage.propTypes = propTypes;
TermsPage.defaultProps = defaultProps;

export default TermsPage;
