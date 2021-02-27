import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import qs from 'qs';
import algoliasearch from 'algoliasearch/lite';
import { isEqual } from 'lodash';
import { SearchBox, InstantSearch } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
    '18BA5IWUAQ',
    'd6c80352ab52395539c1e38b42f499f0',
);

const updateAfter = 700;

const createURL = (state) => `?${qs.stringify(state)}`;

const pathToSearchState = (path) =>
    path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {};

const searchStateToURL = (searchState) =>
    searchState
        ? `${window.location.pathname}?${qs.stringify(searchState)}`
        : '';

const propTypes = {
    router: PropTypes.object.isRequired,
    searchState: PropTypes.object,
    indexName: PropTypes.string,
};

const defaultProps = {
    searchState: {},
    indexName: 'hikes',
};

class HeaderSearchBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        const { searchState, router } = this.props;

        this.state = {
            searchState,
            lastRouter: router,
        };
    }

    static async getInitialProps({ asPath }) {
        const searchState = pathToSearchState(asPath);
        console.log(searchState)

        return {
            searchState,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!isEqual(state.lastRouter, props.router)) {
            return {
                searchState: pathToSearchState(props.router.asPath),
                lastRouter: props.router,
            };
        }

        return null;
    }

    onSearchStateChange = (searchState) => {
        const { router } = this.props;
        clearTimeout(this.debouncedSetState);

        this.debouncedSetState = setTimeout(() => {
            const href = searchStateToURL(searchState);
            // router.push(href, href, {
            //     shallow: true,
            // });
        }, updateAfter);

        console.log(searchState)

        this.setState({ searchState });
    };

    render() {
        const { searchState } = this.state;
        const { indexName } = this.props;

        return (
            <InstantSearch
                searchClient={searchClient}
                onSearchStateChange={this.onSearchStateChange}
                searchState={searchState}
                createURL={createURL}
                indexName={indexName}
                {...this.props}
            >
                <SearchBox />
            </InstantSearch>
        );
    }
}

HeaderSearchBox.propTypes = propTypes;
HeaderSearchBox.defaultProps = defaultProps;

export default withRouter(HeaderSearchBox);
