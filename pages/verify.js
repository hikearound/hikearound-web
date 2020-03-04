import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Page from '../layouts/main';
import Confirmation from '../components/verify/Confirmation';
import { verifyEmailAddress } from '../utils/verify';

const propTypes = {
    title: PropTypes.string,
    uid: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    idToken: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

const defaultProps = {
    title: 'Verify Your Account',
    idToken: null,
    uid: null,
};

class VerifyPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isVerified: true,
        };
    }

    static async getInitialProps(router) {
        const { uid, idToken } = router.query;
        return { uid, idToken };
    }

    componentDidMount() {
        const { uid, idToken } = this.props;
        if (idToken && uid) {
            verifyEmailAddress(uid, idToken);
        }
    }

    renderMainColumn() {
        const { isVerified } = this.state;
        return <Confirmation isVerified={isVerified} />;
    }

    render() {
        const { title } = this.props;
        return <Page title={title} mainColumn={this.renderMainColumn()} />;
    }
}

VerifyPage.propTypes = propTypes;
VerifyPage.defaultProps = defaultProps;

export default withRouter(VerifyPage);
