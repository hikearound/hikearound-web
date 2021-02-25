import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
import UnsubscribeLoadingState from '../loading/Unsubscribe';
import { BlankCard } from '../../styles/card';

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
            this.getVerificationStatus();
        }
    }

    getVerificationStatus = () => {
        const { data, t } = this.props;

        if (data.status === true) {
            this.setState({
                message: t('message.success'),
            });
        }

        if (data.status === false) {
            this.setState({
                message: t('message.error.generic'),
            });
        }
    };

    renderLoadingState = () => {
        return <UnsubscribeLoadingState />;
    };

    render() {
        const { message } = this.state;
        return <BlankCard>{message || this.renderLoadingState()}</BlankCard>;
    }
}

Confirmation.propTypes = propTypes;
Confirmation.defaultProps = defaultProps;

export default withTranslation('verify')(Confirmation);
