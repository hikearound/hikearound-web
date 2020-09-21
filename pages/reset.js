import React from 'react';
import PropTypes from 'prop-types';
import Page from '../layouts/main';
import PasswordForm from '../components/reset/PasswordForm';
import { withSWR } from '../utils/pages/reset';
import { withTranslation } from '../utils/i18n';

const propTypes = {
    data: PropTypes.object,
};

const defaultProps = {
    data: {},
};

class ResetPasswordPage extends React.Component {
    renderMainColumn() {
        const { data } = this.props;
        return <PasswordForm data={data} />;
    }

    render() {
        const { t } = this.props;
        return <Page title={t('title')} mainColumn={this.renderMainColumn()} />;
    }
}

ResetPasswordPage.propTypes = propTypes;
ResetPasswordPage.defaultProps = defaultProps;

export default withTranslation('reset')(withSWR(ResetPasswordPage));
