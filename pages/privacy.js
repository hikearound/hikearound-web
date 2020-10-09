import React from 'react';
import PropTypes from 'prop-types';
import PageBase from '../components/PageBase';
import { getPageData } from '../utils/page';
import TermsNavigation from '../components/privacy/Navigation';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    contentOnly: PropTypes.bool,
    pageType: PropTypes.string,
};

const defaultProps = {
    contentOnly: false,
    pageType: 'privacy',
};

class PrivacyPage extends React.PureComponent {
    static async getInitialProps(context) {
        const { req, query } = context;
        const page = await getPageData(req, 'privacy');

        return {
            title: page.data.title,
            description: page.data.description,
            contentOnly: query.contentOnly,
            namespacesRequired: ['privacy', 'common', 'header', 'footer'],
        };
    }

    renderStickyRightColumn = () => {
        return <TermsNavigation />;
    };

    render() {
        const { title, description, pageType, contentOnly } = this.props;
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
                pageType={pageType}
            />
        );
    }
}

PrivacyPage.propTypes = propTypes;
PrivacyPage.defaultProps = defaultProps;

export default PrivacyPage;
