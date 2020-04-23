import React from 'react';
import Error from 'next/error';
import * as Sentry from '@sentry/node';

class MyError extends Error {
    static async getInitialProps({ res, err, asPath }) {
        const errorInitialProps = await Error.getInitialProps({ res, err });

        errorInitialProps.hasGetInitialPropsRun = true;

        if (res) {
            if (res.statusCode === 404) {
                return { statusCode: 404 };
            }
            if (err) {
                Sentry.captureException(err);
                return errorInitialProps;
            }
        } else if (err) {
            Sentry.captureException(err);
            return errorInitialProps;
        }

        Sentry.captureException(
            new Error(
                `_error.js getInitialProps missing data at path: ${asPath}`,
            ),
        );

        return errorInitialProps;
    }

    render() {
        const { statusCode, hasGetInitialPropsRun, err } = this.props;

        if (!hasGetInitialPropsRun && err) {
            Sentry.captureException(err);
        }

        return <Error statusCode={statusCode} />;
    }
}

export default MyError;
