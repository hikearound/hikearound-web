import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import '../css/reset.css';

const propTypes = {
    children: PropTypes.array.isRequired,
};

class Page extends React.PureComponent {
    render() {
        const { children } = this.props;

        return (
            <div>
                <Header />
                {children}
            </div>
        );
    }
}

Page.propTypes = propTypes;

export default Page;
