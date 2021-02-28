import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { withTranslation } from 'next-i18next';
import { colors } from '../../constants/colors';
import { fontSize } from '../../constants/type';

const propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
    onSuggestionCleared: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    shouldShowMobileInput: PropTypes.bool.isRequired,
};

class AutoComplete extends Component {
    constructor(props, context) {
        super(props, context);
        const { currentRefinement } = this.props;

        this.state = {
            value: currentRefinement,
        };
    }

    componentDidUpdate(prevProps) {
        const { shouldShowMobileInput } = this.props;

        if (prevProps.shouldShowMobileInput !== shouldShowMobileInput) {
            if (shouldShowMobileInput) {
                this.focusSearchInput();
            } else {
                this.clearAndBlurSearchInput();
            }
        }
    }

    onChange = (_, { newValue }) => {
        const { onSuggestionCleared } = this.props;

        if (!newValue) {
            onSuggestionCleared();
        }

        this.setState({
            value: newValue,
        });
    };

    onSuggestionSelected = (_, { suggestion }) => {
        const { router, handleClose } = this.props;

        handleClose();
        this.clearAndBlurSearchInput();

        router.push({
            pathname: '/hike/[hid]',
            query: { hid: suggestion.objectID },
        });
    };

    clearAndBlurSearchInput = () => {
        this.clearSearchInput();
        this.blurSearchInput();
    };

    clearSearchInput = () => {
        this.setState({ value: '' });
    };

    focusSearchInput = () => {
        this.input.focus();
    };

    blurSearchInput = () => {
        this.input.blur();
        this.input.disabled = true;

        setTimeout(() => {
            this.input.disabled = false;
        }, 10);
    };

    onSuggestionsFetchRequested = ({ value }) => {
        const { refine } = this.props;
        refine(value);
    };

    onSuggestionsClearRequested = () => {
        const { refine } = this.props;
        refine();
    };

    getSuggestionValue = (hit) => hit.name;

    renderName = (hit) => (
        <NameWrapper>
            <Highlight attribute='name' hit={hit} tagName='mark' />
        </NameWrapper>
    );

    renderLocation = (hit) => (
        <LocationWrapper>
            <Highlight attribute='city' hit={hit} tagName='mark' />,{' '}
            <Highlight attribute='state' hit={hit} tagName='mark' />
        </LocationWrapper>
    );

    renderSuggestion = (hit) => (
        <SuggestionWrapper>
            {this.renderName(hit)}
            {this.renderLocation(hit)}
        </SuggestionWrapper>
    );

    renderInputComponent = (inputProps) => {
        const { t } = this.props;

        return (
            <div className='inputContainer'>
                <img
                    className='search_icon'
                    src='../images/icons/search.svg'
                    alt={t('search.icon')}
                />
                <input {...inputProps} />
            </div>
        );
    };

    storeInputReference = (autosuggest) => {
        if (autosuggest !== null) {
            this.input = autosuggest.input;
        }
    };

    render() {
        const { hits, t } = this.props;
        const { value } = this.state;

        const inputProps = {
            placeholder: t('search.label'),
            onChange: this.onChange,
            value,
        };

        return (
            <AutoSuggest
                suggestions={hits}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                renderInputComponent={this.renderInputComponent}
                inputProps={inputProps}
                ref={this.storeInputReference}
            />
        );
    }
}

AutoComplete.propTypes = propTypes;

export default withTranslation(['common'])(
    withRouter(connectAutoComplete(AutoComplete)),
);

const SuggestionWrapper = styled.div`
    display: block;
    margin: 0;
`;

const NameWrapper = styled.div`
    display: block;
    font-size: ${fontSize.md};
`;

const LocationWrapper = styled.div`
    display: block;
    margin-top: 2px;
    color: ${colors.grayMedium};

    span {
        font-size: ${fontSize.sm};
    }
`;
