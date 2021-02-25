import React from 'react';
import PropTypes from 'prop-types';
import FooterSection from './landing/section/Footer';
import { GenericRootView, WhiteBackground } from '../styles/page';

const propTypes = {
    component: PropTypes.object,
};

const defaultProps = {
    component: null,
};

class ExternalPage extends React.PureComponent {
    render() {
        const { component } = this.props;

        return (
            <GenericRootView>
                <WhiteBackground />
                <>{component}</>
                <FooterSection centered topBorder />
            </GenericRootView>
        );
    }
}

ExternalPage.propTypes = propTypes;
ExternalPage.defaultProps = defaultProps;

export default ExternalPage;
