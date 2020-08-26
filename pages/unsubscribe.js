import React from 'react';
import PropTypes from 'prop-types';
import Page from '../layouts/main';
import Confirmation from '../components/unsubscribe/Confirmation';
import { withSWR } from '../utils/pages/unsubscribe';
import { withTranslation } from '../utils/i18n';

const propTypes = {
    data: PropTypes.object,
};

const defaultProps = {
    data: {},
};

class UnsubscribePage extends React.Component {
    static getInitialProps() {
        return {
            namespacesRequired: ['unsubscribe', 'header', 'footer'],
        };
    }

    renderMainColumn() {
        const { data } = this.props;
        return <Confirmation data={data} />;
    }

    render() {
        const { t } = this.props;
        return <Page title={t('title')} mainColumn={this.renderMainColumn()} />;
    }
}

UnsubscribePage.propTypes = propTypes;
UnsubscribePage.defaultProps = defaultProps;

export default withTranslation('unsubscribe')(withSWR(UnsubscribePage));
