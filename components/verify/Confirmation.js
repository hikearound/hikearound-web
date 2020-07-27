import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lineHeight } from '../../constants/type';
import { Card } from '../../styles/card';
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
            this.getVerificationStatus();
        }
    }

    getVerificationStatus = () => {
        const { data, t } = this.props;
        let errorMessage = t('message.error.generic');

        if (data.status === true) {
            this.setState({
                message: t('message.success'),
            });
        }

        if (data.error) {
            if (data.error.code === 'auth/id-token-expired') {
                errorMessage = t('message.error.token');
            }
            this.setState({ message: errorMessage });
        }
    };

    render() {
        const { message } = this.state;
        return (
            <Card>
                <VerificationMessage>{message}</VerificationMessage>
            </Card>
        );
    }
}

Confirmation.propTypes = propTypes;

export default withTranslation('verify')(Confirmation);

const VerificationMessage = styled.div`
    line-height: ${lineHeight.lh_13};
`;
