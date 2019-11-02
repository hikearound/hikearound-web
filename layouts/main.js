import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import '../css/reset.css';

const propTypes = {
    children: PropTypes.object.isRequired,
};

const Page = ({ children }) => (
    <div>
        <Header />
        {children}
    </div>
);

Page.propTypes = propTypes;

export default Page;
