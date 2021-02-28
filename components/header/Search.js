import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import AutoComplete from './AutoComplete';

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
);

const propTypes = {
    indexName: PropTypes.string,
    hitsPerPage: PropTypes.number,
};

const defaultProps = {
    indexName: 'hikes',
    hitsPerPage: 6,
};

class HeaderSearchBox extends React.Component {
    onSuggestionCleared = () => null;

    render() {
        const { indexName, hitsPerPage } = this.props;

        return (
            <InstantSearch searchClient={searchClient} indexName={indexName}>
                <Configure hitsPerPage={hitsPerPage} />
                <AutoComplete onSuggestionCleared={this.onSuggestionCleared} />
            </InstantSearch>
        );
    }
}

HeaderSearchBox.propTypes = propTypes;
HeaderSearchBox.defaultProps = defaultProps;

export default withRouter(HeaderSearchBox);
