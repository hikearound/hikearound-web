import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/page/Header';
import { typeface } from '../constants/type';
import { grid } from '../constants/dimensions';
import colors from '../constants/colors';
import '../css/reset.css';

const propTypes = {
    mainColumn: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
    rightColumn: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
    hideHeader: PropTypes.bool,
    singleColumn: PropTypes.bool,
};

const defaultProps = {
    hideHeader: false,
    singleColumn: false,
};

class Page extends React.PureComponent {
    render() {
        const {
            mainColumn,
            rightColumn,
            hideHeader,
            singleColumn,
        } = this.props;

        return (
            <div>
                <GlobalStyle />
                <Header hideHeader={hideHeader} />
                <ContentGrid>
                    <MainColumn singleColumn={singleColumn}>
                        {mainColumn}
                    </MainColumn>
                    {!singleColumn && <RightColumn>{rightColumn}</RightColumn>}
                </ContentGrid>
            </div>
        );
    }
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;

const GlobalStyle = createGlobalStyle`
    body {
        background: ${colors.grayUltraLight};
        color: ${colors.blackText};
        font-family: ${typeface.sansSerif};
    }
`;

const ContentGrid = styled.div`
    max-width: ${grid.main};
    margin: 0 auto;
    vertical-align: top;
    display: flex;
`;

const MainColumn = styled.div`
    width: ${(props) => (props.singleColumn ? grid.main : grid.centerCol)};
    display: inline-block;
`;

const RightColumn = styled.div`
    width: ${grid.rightCol};
    display: inline-block;
    margin-left: 30px;
`;
