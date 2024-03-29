import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'next-i18next';
import Link from 'next/link';
import { colors } from '@constants/colors';
import { spacing } from '@constants/spacing';
import { fontSize } from '@constants/type';
import { device } from '@constants/breakpoints';
import InstantSearch from '@components/search/InstantSearch';
import { appStoreUrl } from '@constants/common';

const propTypes = {
    invertHeader: PropTypes.bool.isRequired,
};

class GlobalNav extends React.PureComponent {
    render() {
        const { invertHeader, t } = this.props;

        return (
            <LinkContainer>
                <InstantSearch />
                <Link href='/about' passHref>
                    <GlobalLink href='/about' invertHeader={invertHeader}>
                        {t('common.about')}
                    </GlobalLink>
                </Link>
                <GlobalLink
                    href={appStoreUrl}
                    invertHeader={invertHeader}
                    target='_blank'
                    rel='noreferrer'
                >
                    {t('common.app')}
                </GlobalLink>
            </LinkContainer>
        );
    }
}

GlobalNav.propTypes = propTypes;

export default withTranslation(['header'])(GlobalNav);

const LinkContainer = styled.div`
    display: inline;
    margin: auto 0;
`;

const GlobalLink = styled.a`
    color: ${(props) => (props.invertHeader ? colors.grayDark : colors.white)};
    cursor: pointer;
    text-decoration: none;
    margin-left: ${spacing.md};
    font-size: ${fontSize.md};

    &:hover {
        text-decoration: underline;
    }

    @media ${device.tablet} {
        display: none;
    }
`;
