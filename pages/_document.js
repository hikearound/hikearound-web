import React from 'react';
import PropTypes from 'prop-types';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { i18n } from '../utils/i18n';

const { NEXT_PUBLIC_GA_TRACKING_ID } = process.env;

const propTypes = {
    lang: PropTypes.string,
};

const defaultProps = {
    lang: 'en',
};

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;
        const lang = i18n.language;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) =>
                    sheets.collect(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: [
                ...React.Children.toArray(initialProps.styles),
                sheets.getStyleElement(),
            ],
            lang,
        };
    }

    render() {
        const { lang } = this.props;

        return (
            <html lang={lang}>
                <Head>
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_TRACKING_ID}`}
                    />
                    <script
                        async
                        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);} gtag('js',new Date());gtag('config','${NEXT_PUBLIC_GA_TRACKING_ID}',{page_path:window.location.pathname,});`,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script> </script>
                </body>
            </html>
        );
    }
}

MyDocument.propTypes = propTypes;
MyDocument.defaultProps = defaultProps;

export default MyDocument;
