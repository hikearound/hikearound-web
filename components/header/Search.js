import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { withTranslation } from 'next-i18next';
import AutoComplete from './AutoComplete';
import SearchIcon from '../icons/Search';
import CloseIcon from '../icons/Dismiss';
import { device } from '../../constants/breakpoints';
import { colors } from '../../constants/colors';

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
                <SearchIcon size={14} color={colors.purple} />
            </SearchIconWrapper>
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
        const { indexName, hitsPerPage } = this.props;
        const { shouldShowMobileInput } = this.state;

        return (
            <>
                {this.renderSearchIcon()}
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
                {this.renderCloseIcon()}
            </>
        );
    }
}

HeaderSearchBox.propTypes = propTypes;
HeaderSearchBox.defaultProps = defaultProps;

export default withTranslation(['common'])(withRouter(HeaderSearchBox));

const SearchIconWrapper = styled.div`
    display: none;
    background-color: ${colors.grayUltraLight};
    height: 30px;
    width: 30px;
    border-radius: 100%;
    position: absolute;
    top: 10px;
    right: 10px;

    svg {
        position: relative;
        left: 8px;
        top: 7px;
    }

    @media ${device.tablet} {
        display: ${(props) =>
            props.shouldShowMobileInput ? 'none' : 'inline-block'};
    }
`;

const CloseIconWrapper = styled.div`
    display: none;
    position: absolute;
    right: 17px;
    opacity: 0.9;

    @media ${device.tablet} {
        display: ${(props) =>
            props.shouldShowMobileInput ? 'inline-block' : 'none'};
    }
`;

const SearchWrapper = styled.div`
    display: inline-block;

    @media ${device.tablet} {
        display: ${(props) =>
            props.shouldShowMobileInput ? 'inline-block' : 'none'};
    }
`;
