import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/page/Header';
import Footer from '../components/page/Footer';
import { typeface, fontSize } from '../constants/type';
import { grid } from '../constants/dimensions';
import colors from '../constants/colors';
import '../css/reset.css';
import { device } from '../constants/breakpoints';

const columnType = [PropTypes.object, PropTypes.array];

const propTypes = {
    mainColumn: PropTypes.oneOfType(columnType).isRequired,
    rightColumn: PropTypes.oneOfType(columnType),
    hideHeader: PropTypes.bool,
    singleColumn: PropTypes.bool,
    title: PropTypes.string.isRequired,
};

const defaultProps = {
    rightColumn: [],
    hideHeader: false,
    singleColumn: false,
};

class Page extends React.PureComponent {
    constructor(props) {
        super(props);
        const { title } = this.props;
        this.state = {
            pageTitle: title,
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

    renderRightColumn() {
        const { rightColumn } = this.props;
        return (
            <RightColumn>
                {rightColumn}
                <Footer />
            </RightColumn>
        );
    }

    render() {
        const { mainColumn, hideHeader, singleColumn } = this.props;
        const { pageTitle } = this.state;

        return (
            <div>
                <GlobalStyle />
                <Header hideHeader={hideHeader} title={pageTitle} />
                <ContentGrid>
                    <MainColumn singleColumn={singleColumn}>
                        {mainColumn}
                    </MainColumn>
                    {!singleColumn && this.renderRightColumn()}
                </ContentGrid>
            </div>
        );
    }
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;

const headerOffset = `calc(${grid.header} + ${grid.gutter})`;

const GlobalStyle = createGlobalStyle`
    body {
        background: ${colors.grayUltraLight};
        color: ${colors.blackText};
        font-family: ${typeface.sansSerif};

        @media ${device.tablet} {
            background: ${colors.white};
        }
    }

    div, span {
        font-size: ${fontSize.md};
    }
`;

const ContentGrid = styled.div`
    max-width: ${grid.main};
    padding: ${headerOffset} ${grid.gutter} 0 ${grid.gutter};
    margin: 0 auto;
    vertical-align: top;
    display: flex;

    @media ${device.tablet} {
        flex-direction: column;
        padding: ${grid.header} 0 0 0;
    }
`;

const MainColumn = styled.div`
    width: ${(props) => (props.singleColumn ? grid.main : grid.centerCol)};
    display: inline-block;

    @media ${device.tablet} {
        width: 100%;
    }
`;

const RightColumn = styled.div`
    width: ${grid.rightCol};
    display: inline-block;
    margin-left: ${grid.gutter};

    @media ${device.tablet} {
        width: 100%;
        margin-left: 0;
    }
`;
