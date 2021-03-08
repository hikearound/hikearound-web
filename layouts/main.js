import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import NProgress from 'nprogress';
import Header from '../components/page/Header';
import Footer from '../components/page/Footer';
import {
    GlobalStyle,
    ContentGrid,
    MainColumn,
    FullWidthMainColumn,
    RightColumn,
    StickyContainer,
} from '../styles/layout';
import { Card } from '../styles/card';

const columnType = [PropTypes.object, PropTypes.array];

const propTypes = {
    mainColumn: PropTypes.oneOfType(columnType).isRequired,
    rightColumn: PropTypes.oneOfType(columnType),
    rightColumnSticky: PropTypes.oneOfType(columnType),
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    singleColumn: PropTypes.bool,
    title: PropTypes.string.isRequired,
    fullWidth: PropTypes.bool,
    hike: PropTypes.object,
    invertHeader: PropTypes.bool,
};

const defaultProps = {
    rightColumn: [],
    rightColumnSticky: [],
    hideHeader: false,
    hideFooter: false,
    singleColumn: false,
    fullWidth: false,
    hike: null,
    invertHeader: false,
};

class Page extends React.PureComponent {
    constructor(props) {
        super(props);

        Router.events.on('routeChangeStart', () => {
            NProgress.start();
        });

        Router.events.on('routeChangeComplete' || 'routeChangeError', () => {
            NProgress.done();
        });

        const pageTitle = this.getAndSetPageTitle('firstRun');

        this.state = { pageTitle };
    }

    componentDidUpdate(prevProps) {
        const { title } = this.props;

        if (prevProps.title !== title) {
            this.getAndSetPageTitle();
        }
    }

    getAndSetPageTitle = (type) => {
        const { title } = this.props;
        let pageTitle = title;

        if (!pageTitle.includes('Hikearound')) {
            pageTitle = `${pageTitle} | Hikearound`;
        }

        if (type !== 'firstRun') {
            this.setState({ pageTitle });
        }

        return pageTitle;
    };

    renderFooter = () => (
        <Card hideGutter>
            <Footer inlineCopyright />
        </Card>
    );

    renderRightColumn() {
        const { rightColumnSticky, rightColumn, hideFooter } = this.props;

        return (
            <RightColumn>
                {rightColumn}
                <StickyContainer>
                    {rightColumnSticky}
                    {!hideFooter && this.renderFooter()}
                </StickyContainer>
            </RightColumn>
        );
    }

    render() {
        const {
            mainColumn,
            hideHeader,
            singleColumn,
            fullWidth,
            hike,
            invertHeader,
        } = this.props;
        const { pageTitle } = this.state;

        return (
            <div>
                <GlobalStyle />
                <Header
                    hideHeader={hideHeader}
                    title={pageTitle}
                    hike={hike}
                    invertHeader={invertHeader}
                />
                <ContentGrid hideHeader={hideHeader} fullWidth={fullWidth}>
                    {!fullWidth && (
                        <MainColumn singleColumn={singleColumn}>
                            {mainColumn}
                        </MainColumn>
                    )}
                    {fullWidth && (
                        <FullWidthMainColumn>{mainColumn}</FullWidthMainColumn>
                    )}
                    {!singleColumn && this.renderRightColumn()}
                </ContentGrid>
            </div>
        );
    }
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
