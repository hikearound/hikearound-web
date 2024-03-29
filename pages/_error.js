import React from 'react';
import PropTypes from 'prop-types';
import NextErrorComponent from 'next/error';
import * as Sentry from '@sentry/nextjs';

const propTypes = {
    statusCode: PropTypes.number.isRequired,
    hasGetInitialPropsRun: PropTypes.bool.isRequired,
    err: PropTypes.string.isRequired,
};

const MyError = function ({ statusCode, hasGetInitialPropsRun, err }) {
    if (!hasGetInitialPropsRun && err) {
        Sentry.captureException(err);
    }
    return <NextErrorComponent statusCode={statusCode} />;
};

MyError.getInitialProps = async ({ res, err, asPath }) => {
    const errorInitialProps = await NextErrorComponent.getInitialProps({
        res,
        err,
    });

    errorInitialProps.hasGetInitialPropsRun = true;

    if (!err) {
        err = new Error(
            `_error.js getInitialProps missing data at path: ${asPath}`,
        );
    }

    Sentry.captureException(err);
    await Sentry.flush(2000);

    return errorInitialProps;
};

MyError.propTypes = propTypes;

export default MyError;
