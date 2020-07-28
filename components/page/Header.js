import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import GlobalHeader from '../GlobalHeader';
import { baseUrl, ogImage } from '../../constants/common';
import { withTranslation } from '../../utils/i18n';

const propTypes = {
    hideHeader: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    creator: PropTypes.string,
    site: PropTypes.string,
    type: PropTypes.string,
    hike: PropTypes.object,
    invertHeader: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
};

const defaultProps = {
    creator: '@doog',
    site: '@tryhikearound',
    type: 'summary_large_image',
    hike: null,
};

class Header extends React.PureComponent {
    generateUrl = () => {
        const { router } = this.props;
        return `${baseUrl}${router.asPath}`;
    };

    getHikeDescription = () => {
        const { hike } = this.props;
        return hike.description.replace(/(\n\n)/gm, ' ');
    };

    renderOpenGraph = () => {
        const { creator, site, type, hike, title, t } = this.props;
        const url = this.generateUrl();

        let description = t('description');
        let image = ogImage;

        if (hike) {
            description = this.getHikeDescription();
            image = hike.mapImage;
        }

        return (
            <>
                <meta name='twitter:card' content={type} />
                <meta name='twitter:site' content={site} />
                <meta name='twitter:creator' content={creator} />
                <meta property='og:url' content={url} />
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:image' content={image} />
            </>
        );
    };

    render() {
        const { hideHeader, title, invertHeader } = this.props;

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
                        href='/images/favicon/favicon.png'
                        type='image/png'
                    />
                </Head>
                {!hideHeader && <GlobalHeader invertHeader={invertHeader} />}
            </>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default withRouter(withTranslation('common')(Header));
