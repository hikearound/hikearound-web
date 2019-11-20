import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import GlobalHeader from '../GlobalHeader';

const propTypes = {
    hideHeader: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};

class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: null,
        };
    }

    async componentDidMount() {
        const { title } = this.props;
        if (!title.includes('Hikearound')) {
            const pageTitle = `${title} - Hikearound`;
            await this.setState({
                pageTitle,
            });
        }
    }

    render() {
        const { hideHeader } = this.props;
        const { pageTitle } = this.state;

        return (
            <>
                <Head>
                    <title>{pageTitle}</title>
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
