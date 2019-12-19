import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import Page from '../layouts/main';
import PageContent from './PageContent';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
};

const defaultProps = {
    hideHeader: false,
    hideFooter: false,
};

class PageBase extends React.PureComponent {
    renderMainColumn() {
        const { title, description, hideFooter } = this.props;

        return (
            <PageContent
                title={title}
                description={description}
                hideFooter={hideFooter}
            />
        );
    }

    render() {
        const { title, hideHeader, hideFooter } = this.props;

        return (
            <Page
                title={RichText.asText(title)}
                mainColumn={this.renderMainColumn()}
                hideHeader={hideHeader}
                hideFooter={hideFooter}
            />
        );
    }
}

PageBase.propTypes = propTypes;
PageBase.defaultProps = defaultProps;

export default PageBase;
