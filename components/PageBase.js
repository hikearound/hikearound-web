import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import Page from '../layouts/main';
import PageContent from './PageContent';

const columnType = [PropTypes.object, PropTypes.array];

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    rightColumnSticky: PropTypes.oneOfType(columnType),
    pageType: PropTypes.string.isRequired,
};

const defaultProps = {
    hideHeader: false,
    hideFooter: false,
    rightColumnSticky: [],
};

class PageBase extends React.PureComponent {
    renderMainColumn() {
        const { title, description, pageType, hideFooter } = this.props;

        return (
            <PageContent
                title={title}
                description={description}
                hideFooter={hideFooter}
                pageType={pageType}
            />
        );
    }

    render() {
        const { title, hideHeader, hideFooter, rightColumnSticky } = this.props;

        return (
            <Page
                title={RichText.asText(title)}
                mainColumn={this.renderMainColumn()}
                hideHeader={hideHeader}
                hideFooter={hideFooter}
                rightColumnSticky={rightColumnSticky}
            />
        );
    }
}

PageBase.propTypes = propTypes;
PageBase.defaultProps = defaultProps;

export default PageBase;
