import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import GlobalHeader from '../GlobalHeader';
import { baseUrl } from '../../constants/common';

const propTypes = {
    hideHeader: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    creator: PropTypes.string,
    site: PropTypes.string,
    type: PropTypes.string,
    hike: PropTypes.object,
};

const defaultProps = {
    creator: '@doog',
    site: '@tryhikearound',
    type: 'summary_large_image',
    hike: null,
};

class Header extends React.PureComponent {
    generateUrl = () => {
        const { hike } = this.props;
        return `${baseUrl}hike/${hike.id}`;
    };

    renderOpenGraph = () => {
        const { creator, site, type, hike, title } = this.props;

        if (hike) {
            const url = this.generateUrl();

            return (
                <>
                    <meta name='twitter:card' content={type} />
                    <meta name='twitter:site' content={site} />
                    <meta name='twitter:creator' content={creator} />
                    <meta property='og:url' content={url} />
                    <meta property='og:title' content={title} />
                    <meta
                        property='og:description'
                        content={hike.description}
                    />
                    <meta property='og:image' content={hike.mapImage} />
                </>
            );
        }

        return null;
    };

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
                    {this.renderOpenGraph()}
                    <link
                        rel='icon'
                        href='/images/favicon.png'
                        type='image/png'
                    />
                </Head>
                {!hideHeader && <GlobalHeader />}
            </>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
