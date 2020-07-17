import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lineHeight } from '../../constants/type';
import { Card } from '../../styles/card';

const propTypes = {
    data: PropTypes.object.isRequired,
};

let errorMessage = "We're sorry, we were unable to verify your account.";

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
        const { data } = this.props;

        if (data.status === true) {
            this.setState({
                message: 'Your account was successfully verified.',
            });
        }

        if (data.error) {
            if (data.error.code === 'auth/id-token-expired') {
                errorMessage =
                    "We're sorry, we were unable to verify your account because the verification token expired.";
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

export default Confirmation;

const VerificationMessage = styled.div`
    line-height: ${lineHeight.lh_13};
`;
