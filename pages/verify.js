import React from 'react';
import PropTypes from 'prop-types';
import Page from '../layouts/main';
import Confirmation from '../components/verify/Confirmation';
import { withSWR } from '../utils/pages/verify';

const propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
};

const defaultProps = {
    title: 'Verify Your Account',
    data: {},
};

class VerifyPage extends React.Component {
    renderMainColumn() {
        const { data } = this.props;

        if (data.status) {
            return <Confirmation isVerified={data.status} />;
        }

        return <Confirmation isVerified={false} />;
    }

    render() {
        const { title } = this.props;
        return <Page title={title} mainColumn={this.renderMainColumn()} />;
    }
}

VerifyPage.propTypes = propTypes;
VerifyPage.defaultProps = defaultProps;

export default withSWR(VerifyPage);
