import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import { Card, GenericCardContent } from '../../styles/card';
import { withTranslation } from '../../utils/i18n';

const propTypes = {
    data: PropTypes.object.isRequired,
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

    renderLoadingState = () => {
        return (
            <>
                <Skeleton variant='text' />
                <Skeleton variant='text' width={300} />
            </>
        );
    };

    render() {
        const { message } = this.state;

        return (
            <Card>
                <GenericCardContent>
                    {message || this.renderLoadingState()}
                </GenericCardContent>
            </Card>
        );
    }
}

Confirmation.propTypes = propTypes;

export default withTranslation(['unsubscribe', 'notifications'])(Confirmation);
