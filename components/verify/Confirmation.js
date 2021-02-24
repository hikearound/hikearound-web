import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
import VerifyLoadingState from '../loading/Verify';
import { Card, GenericCardContent } from '../../styles/card';

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
        return <VerifyLoadingState />;
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

export default withTranslation('verify')(Confirmation);
