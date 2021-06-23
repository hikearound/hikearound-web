import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter } from 'next/router';
import { spacing } from '@constants/spacing';

const propTypes = {
    i18n: PropTypes.object.isRequired,
};

class LanguageSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleChange = (event) => {
        const { router } = this.props;
        const { locale } = event.currentTarget.dataset;

        this.handleClose();

        router.push(router.asPath, undefined, {
            locale,
        });
    };

    setSelectedLanguage = (id) => {
        const { i18n } = this.props;

        if (i18n.language === id) {
            return true;
        }

        return false;
    };

    renderMenu = () => {
        const { anchorEl } = this.state;

        return (
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                <MenuItem
                    data-locale='en'
                    selected={this.setSelectedLanguage('en')}
                    onClick={this.handleChange}
                >
                    English
                </MenuItem>
                <MenuItem
                    data-locale='es'
                    selected={this.setSelectedLanguage('es')}
                    onClick={this.handleChange}
                >
                    Española
                </MenuItem>
            </Menu>
        );
    };

    renderLabel = () => {
        const { t } = this.props;

        return (
            <SelectLabel onClick={this.handleClick}>
                {t('link.language')}
            </SelectLabel>
        );
    };

    render() {
        return (
            <>
                {this.renderLabel()}
                {this.renderMenu()}
            </>
        );
    }
}

LanguageSelect.propTypes = propTypes;

export default withRouter(withTranslation(['footer'])(LanguageSelect));

const SelectLabel = styled.span`
    position: relative;
    margin-right: ${spacing.sm};

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;
