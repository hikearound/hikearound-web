import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
import { BlankCard } from '@styles/card';
import UnsubscribeLoadingState from '@components/loading/Unsubscribe';

const propTypes = {
    data: PropTypes.object,
};

const defaultProps = {
    data: null,
};

class Confirmation extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { message: null };
    }

    componentDidUpdate(prevProps) {
        const { data } = this.props;

        if (prevProps.data !== data) {
            this.getSubscriptionStatus();
        }
    }

    getSubscriptionStatus = () => {
        const { data, t } = this.props;
        const emailType = t(`notifications:type.${data.type}`).toLowerCase();

        if (data.status === true) {
            this.setState({
                message: t('message.success', { emailType }),
            });
        }

        if (data.status === false) {
            this.setState({
                message: t('message.error.generic', { emailType }),
            });
        }
    };

    renderLoadingState = () => <UnsubscribeLoadingState />;

    render() {
        const { message } = this.state;
        return <BlankCard>{message || this.renderLoadingState()}</BlankCard>;
    }
}

Confirmation.propTypes = propTypes;
Confirmation.defaultProps = defaultProps;

export default withTranslation(['unsubscribe', 'notifications'])(Confirmation);
