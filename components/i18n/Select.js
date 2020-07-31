import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from '../../utils/i18n';
import { spacing } from '../../constants/spacing';
import { fontSize } from '../../constants/type';

const propTypes = {
    i18n: PropTypes.object.isRequired,
};

class LanguageSelect extends React.PureComponent {
    constructor(props) {
        super(props);

        const { i18n } = this.props;

        this.state = {
            value: i18n.language,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        const { i18n } = this.props;

        i18n.changeLanguage(event.target.value);
        this.setState({ value: event.target.value });
    };

    render() {
        const { t } = this.props;
        const { value } = this.state;

        return (
            <SelectLabel>
                {t('link.language')}
                <Label id='languageLabel'>{t('link.language')}</Label>
                <LanguagePicker
                    name='language'
                    id='language'
                    onChange={this.handleChange}
                    value={value}
                    aria-labelledby='languageLabel'
                >
                    <option value='en'>English</option>
                    <option value='es'>Española</option>
                </LanguagePicker>
            </SelectLabel>
        );
    }
}

LanguageSelect.propTypes = propTypes;

export default withTranslation(['footer'])(LanguageSelect);

const SelectLabel = styled.span`
    position: relative;
    margin-right: ${spacing.sm};

    &:hover {
        text-decoration: underline;
    }
`;

const Label = styled.span`
    display: none;
`;

const LanguagePicker = styled.select`
    -webkit-appearance: none;
    border: none;
    cursor: pointer;
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100;
    font-size: ${fontSize.sm};

    &:focus {
        outline: 0;
    }

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;
