import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { withTranslation } from 'next-i18next';
import AutoComplete from '@components/search/AutoComplete';
import SearchIcon from '@components/icons/Search';
import CloseIcon from '@components/icons/Dismiss';
import { colors } from '@constants/colors';
import {
    SearchIconWrapper,
    SearchWrapper,
    CloseIconWrapper,
} from '@styles/search';

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

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            shouldShowMobileInput: false,
        };

        this.handleClose = this.handleClose.bind(this);
    }

    onSuggestionCleared = () => null;

    handleOpen = () => {
        this.setState({
            shouldShowMobileInput: true,
        });
    };

    handleClose = () => {
        this.setState({ shouldShowMobileInput: false });
    };

    renderSearchIcon = () => {
        const { shouldShowMobileInput } = this.state;

        return (
            <SearchIconWrapper
                onClick={this.handleOpen}
                shouldShowMobileInput={shouldShowMobileInput}
            >
                <SearchIcon size={14} color={colors.white} />
            </SearchIconWrapper>
        );
    };

    renderSearchInput = () => {
        const { indexName, hitsPerPage } = this.props;
        const { shouldShowMobileInput } = this.state;

        return (
            <SearchWrapper shouldShowMobileInput={shouldShowMobileInput}>
                <InstantSearch
                    searchClient={searchClient}
                    indexName={indexName}
                >
                    <Configure hitsPerPage={hitsPerPage} />
                    <AutoComplete
                        onSuggestionCleared={this.onSuggestionCleared}
                        handleClose={this.handleClose}
                        shouldShowMobileInput={shouldShowMobileInput}
                    />
                </InstantSearch>
            </SearchWrapper>
        );
    };

    renderCloseIcon = () => {
        const { shouldShowMobileInput } = this.state;

        return (
            <CloseIconWrapper
                onClick={this.handleClose}
                shouldShowMobileInput={shouldShowMobileInput}
            >
                <CloseIcon size={15} color={colors.grayMedium} />
            </CloseIconWrapper>
        );
    };

    render() {
        return (
            <span>
                {this.renderSearchIcon()}
                {this.renderSearchInput()}
                {this.renderCloseIcon()}
            </span>
        );
    }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default withTranslation(['common'])(withRouter(Search));
