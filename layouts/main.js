import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/page/Header';
import { typeface } from '../constants/type';
import colors from '../constants/colors';
import '../css/reset.css';

const propTypes = {
    mainColumn: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
    rightColumn: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
};

class Page extends React.PureComponent {
    render() {
        const { mainColumn, rightColumn } = this.props;

        return (
            <div>
                <GlobalStyle />
                <Header />
                <ContentGrid>
                    <MainColumn>{mainColumn}</MainColumn>
                    <RightColumn>{rightColumn}</RightColumn>
                </ContentGrid>
            </div>
        );
    }
}

Page.propTypes = propTypes;

export default Page;

const GlobalStyle = createGlobalStyle`
    body {
        background: ${colors.grayUltraLight};
        color: ${colors.blackText};
        font-family: ${typeface.sansSerif};
    }
`;

const ContentGrid = styled.div`
    max-width: 970px;
    margin: 0 auto;
    vertical-align: top;
    display: flex;
`;

const MainColumn = styled.div`
    width: 670px;
    display: inline-block;
`;

const RightColumn = styled.div`
    width: 270px;
    display: inline-block;
    margin-left: 30px;
`;
