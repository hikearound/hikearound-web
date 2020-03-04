import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../styles/card';

const propTypes = {
    isVerified: PropTypes.bool.isRequired,
};

const failureMessage = "We're sorry, we were unable to verify your account.";
const successMessage = 'Your account was successfully verified.';

class Description extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            message: '',
        };
    }

    componentDidMount() {
        const { isVerified } = this.props;
        if (isVerified) {
            this.setState({
                message: successMessage,
            });
        }
        this.setState({
            message: failureMessage,
        });
    }

    render() {
        const { message } = this.state;
        return <Card>{message}</Card>;
    }
}

Description.propTypes = propTypes;

export default Description;
