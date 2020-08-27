import React from 'react';
import PropTypes from 'prop-types';
import Page from '../layouts/main';
import Confirmation from '../components/verify/Confirmation';
import { withSWR } from '../utils/pages/verify';
import { withTranslation } from '../utils/i18n';

const propTypes = {
    data: PropTypes.object,
};

const defaultProps = {
    data: {},
};

class VerifyPage extends React.Component {
    renderMainColumn() {
        const { data } = this.props;
        return <Confirmation data={data} />;
    }

    render() {
        const { t } = this.props;
        return <Page title={t('title')} mainColumn={this.renderMainColumn()} />;
    }
}

VerifyPage.propTypes = propTypes;
VerifyPage.defaultProps = defaultProps;

export default withTranslation('verify')(withSWR(VerifyPage));
