import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { PrimaryHeading } from '../styles/headings';
import { Card } from '../styles/card';
import { sections as termsSections } from '../constants/terms';
import { sections as privacySections } from '../constants/privacy';
import { RootView } from '../styles/page';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    pageType: PropTypes.string.isRequired,
    hideFooter: PropTypes.bool,
};

const defaultProps = {
    hideFooter: false,
};

class PageContent extends React.PureComponent {
    propsWithUniqueKey = (props, key) => {
        return Object.assign(props || {}, { key });
    };

    renderAnchor = (key) => {
        const { pageType } = this.props;
        let props = {};

        if (pageType === 'terms') {
            props = {
                className: 'anchor',
                id: termsSections[key],
                href: `#${termsSections[key]}`,
            };
        }

        if (pageType === 'privacy') {
            props = {
                className: 'anchor',
                id: privacySections[key],
                href: `#${privacySections[key]}`,
            };
        }

        const uniqueKey = `${key}-anchor`;

        return React.createElement(
            'a',
            this.propsWithUniqueKey(props, uniqueKey),
        );
    };

    renderSubheading = (children, key) => {
        const props = {};
        const uniqueKey = `${key}-subheading`;

        return React.createElement(
            'h5',
            this.propsWithUniqueKey(props, uniqueKey),
            children,
        );
    };

    htmlSerializer = (type, element, content, children, key) => {
        if (type === 'heading5') {
            const subheading = this.renderSubheading(children, key);
            const anchor = this.renderAnchor(key);

            return [anchor, subheading];
        }

        return null;
    };

    render() {
        const { title, description, hideFooter } = this.props;

        return (
            <RootView>
                <Card hideGutter={hideFooter} lastChild>
                    <PrimaryHeading>{RichText.asText(title)}</PrimaryHeading>
                    <RichText
                        render={description}
                        htmlSerializer={this.htmlSerializer}
                    />
                </Card>
            </RootView>
        );
    }
}

PageContent.propTypes = propTypes;
PageContent.defaultProps = defaultProps;

export default PageContent;
