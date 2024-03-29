import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet as StyledComponentsSheet } from 'styled-components';
import { ServerStyleSheets as MaterialUiSheets } from '@material-ui/core/styles';
import { gtagConfig } from '@constants/analytics';

const { NEXT_PUBLIC_GA_TRACKING_ID } = process.env;

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const styledComponentsSheet = new StyledComponentsSheet();
        const materialUiSheets = new MaterialUiSheets();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        styledComponentsSheet.collectStyles(
                            materialUiSheets.collect(<App {...props} />),
                        ),
                });

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: [
                    <React.Fragment key='styles'>
                        {initialProps.styles}
                        {materialUiSheets.getStyleElement()}
                        {styledComponentsSheet.getStyleElement()}
                    </React.Fragment>,
                ],
            };
        } finally {
            styledComponentsSheet.seal();
        }
    }

    render() {
        const { __NEXT_DATA__ } = this.props;
        const { locale } = __NEXT_DATA__;

        return (
            <Html lang={locale}>
                <Head>
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${NEXT_PUBLIC_GA_TRACKING_ID}', {
                                page_path: window.location.pathname,
                                cookie_flags: '${gtagConfig}',
                            });
                            `,
                        }}
                    />
                    <script
                        async
                        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script> </script>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
