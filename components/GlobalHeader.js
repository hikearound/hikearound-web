import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'next-i18next';
import { colors, transparentColors } from '../constants/colors';
import { grid } from '../constants/dimensions';
import AppLogo from './AppLogo';
import GlobalNav from './GlobalNav';
import { device } from '../constants/breakpoints';

const propTypes = {
    invertHeader: PropTypes.bool.isRequired,
};

class GlobalHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        window.addEventListener('scroll', this.setScrollState, {
            passive: true,
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.setScrollState);
    }

    setScrollState = () => {
        let hasScrolled = true;

        if (window.scrollY === 0) {
            hasScrolled = false;
        }

        this.setState({ hasScrolled });
    };

    render() {
        const { invertHeader, t } = this.props;
        const { hasScrolled } = this.state;

        return (
            <HeaderContainer
                invertHeader={invertHeader}
                hasScrolled={hasScrolled}
            >
                <HeaderInterior>
                    <AppLogo
                        alt={t('common.logo', {
                            appName: t('common:appName', { count: 0 }),
                        })}
                        invertHeader={invertHeader}
                    />
                    <GlobalNav invertHeader={invertHeader} />
                </HeaderInterior>
            </HeaderContainer>
        );
    }
}

GlobalHeader.propTypes = propTypes;

export default withTranslation(['header', 'common'])(GlobalHeader);

const HeaderContainer = styled.div`
    z-index: 2;
    height: ${grid.header};
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${(props) =>
        props.invertHeader ? colors.white : colors.purple};
    box-shadow: ${(props) =>
        props.hasScrolled
            ? `0 2px 2px 0 ${transparentColors.grayLight}`
            : 'none'};
    padding: 0 ${grid.gutter};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: ${(props) =>
        props.invertHeader ? `1px solid ${colors.gray}` : `0px`};

    @media ${device.tablet} {
        margin-bottom: 0;
    }
`;

const HeaderInterior = styled.div`
    width: 100%;
    max-width: ${grid.main};
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
