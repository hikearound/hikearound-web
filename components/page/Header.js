import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import GlobalHeader from '../GlobalHeader';

const propTypes = {
    hideHeader: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};

class Header extends React.PureComponent {
    render() {
        const { hideHeader, title } = this.props;

        return (
            <>
                <Head>
                    <title>{title}</title>
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1'
                    />
                    <meta charSet='utf-8' />
                </Head>
                {!hideHeader && <GlobalHeader />}
            </>
        );
    }
}

Header.propTypes = propTypes;

export default Header;
