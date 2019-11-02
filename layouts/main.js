import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';

const propTypes = {
    children: PropTypes.object.isRequired,
};

const Page = ({ children }) => (
    <>
        <Header />
        {children}
    </>
);

Page.propTypes = propTypes;

export default Page;
