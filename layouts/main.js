import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../components/PageHeader';
import '../css/reset.css';

const propTypes = {
    children: PropTypes.array.isRequired,
};

class Page extends React.PureComponent {
    render() {
        const { children } = this.props;

        return (
            <div>
                <PageHeader />
                {children}
            </div>
        );
    }
}

Page.propTypes = propTypes;

export default Page;
