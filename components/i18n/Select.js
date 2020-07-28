import React from 'react';
import styled from 'styled-components';
import { i18n, withTranslation } from '../../utils/i18n';
import { colors } from '../../constants/colors';
import { fontSize, lineHeight } from '../../constants/type';

class LanguageSelect extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: 'default',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        i18n.changeLanguage(event.target.value);
        this.setState({ value: 'default' });
    };

    setWidth = () => {
        let width = 'initial';
        if (i18n.language === 'es') {
            width = 48;
        }
        return width;
    };

    render() {
        const { t } = this.props;
        const { value } = this.state;
        const width = this.setWidth();

        return (
            <span>
                <Label htmlFor='language'>{t('link.language')}</Label>
                <LanguagePicker
                    name='language'
                    id='language'
                    onChange={this.handleChange}
                    value={value}
                    style={{ width }}
                >
                    <option value={value} disabled hidden>
                        {t('link.language')}
                    </option>
                    <option value='en'>English</option>
                    <option value='es'>Española</option>
                </LanguagePicker>
            </span>
        );
    }
}

export default withTranslation(['footer'])(LanguageSelect);

const Label = styled.label`
    visibility: hidden;
    display: inline-block;
    width: 0;
`;

const LanguagePicker = styled.select`
    -webkit-appearance: none;
    border: none;
    color: ${colors.grayDark};
    font-size: ${fontSize.sm};
    line-height: ${lineHeight.lh_13};
    text-indent: -2px;
    margin-right: 4px;

    &:focus {
        outline: 0;
    }

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;
