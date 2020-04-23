import React from 'react';
import PropTypes from 'prop-types';
import Page from '../layouts/main';
import { Card } from '../styles/card';

const propTypes = {
    title: PropTypes.string,
};

const defaultProps = {
    title: '404',
};

class ErrorPage extends React.Component {
    renderMainColumn = () => {
        return <Card>We encountered an error. Sorry about that.</Card>;
    };

    render() {
        const { title } = this.props;
        return <Page title={title} mainColumn={this.renderMainColumn()} />;
    }
}

ErrorPage.propTypes = propTypes;
ErrorPage.defaultProps = defaultProps;

export default ErrorPage;
