import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
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
        return <Skeleton variant='text' width={300} />;
    };

    render() {
        const { message } = this.state;

        return (
            <Card>
                <ConfirmationMessage>
                    {message || this.renderLoadingState()}
                </ConfirmationMessage>
            </Card>
        );
    }
}

Confirmation.propTypes = propTypes;

export default withTranslation('verify')(Confirmation);

const ConfirmationMessage = styled.div`
    line-height: ${lineHeight.lh_13};
`;
