import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'next-i18next';
import Link from 'next/link';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { colors } from '@constants/colors';
import { fontSize, lineHeight } from '@constants/type';
import { RightRailLink } from '@styles/links';
import LanguageSelect from '@components/i18n/Select';
import { device } from '@constants/breakpoints';
import { spacing } from '@constants/spacing';

const propTypes = {
    inlineCopyright: PropTypes.bool,
};

const defaultProps = {
    inlineCopyright: false,
};

class Footer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            anchorEl: null,
        };
    }

    renderCopyrightText = () => {
        const { inlineCopyright, t } = this.props;
        const date = new Date();

        return (
            <CopyrightText inlineCopyright={inlineCopyright}>
                {t('label.copyright', { year: date.getFullYear() })}
            </CopyrightText>
        );
    };

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    renderMenu = () => {
        const { anchorEl } = this.state;
        const moreLinks = this.renderMoreLinks();

        return (
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                {moreLinks.map(({ text, link, target, rel }, index) => (
                    <RightRailLink
                        href={link}
                        target={target}
                        rel={rel}
                        key={index}
                    >
                        <MenuItem onClick={this.handleClose}>{text}</MenuItem>
                    </RightRailLink>
                ))}
            </Menu>
        );
    };

    renderLinks = () => {
        const { t } = this.props;

        return [
            {
                text: t('link.contact'),
                link: 'mailto:support@tryhikearound.com',
                target: null,
                type: 'href',
            },
            {
                text: t('link.privacy'),
                link: '/privacy',
                type: 'router',
            },
            {
                text: t('link.terms'),
                link: '/terms',
                type: 'router',
            },
            {
                text: t('link.more'),
                link: null,
                type: 'menu',
            },
        ];
    };

    renderMoreLinks = () => {
        const { t } = this.props;

        return [
            {
                text: t('link.about'),
                link: '/about',
                type: 'router',
            },
            {
                text: t('link.blog'),
                link: 'https://medium.com/hikearound',
                target: '_blank',
                type: 'href',
                rel: 'noreferrer',
            },
            {
                text: t('link.help'),
                link: '/help',
                type: 'router',
            },
        ];
    };

    renderLinkItem = (text, link, target, type, index) => {
        if (type === 'href') {
            return (
                <RightRailLink href={link} target={target} key={index}>
                    {text}
                </RightRailLink>
            );
        }

        if (type === 'menu') {
            return (
                <RightRailLink onClick={this.handleClick} key={index}>
                    {text}
                </RightRailLink>
            );
        }

        return (
            <Link href={link} key={index} passHref>
                <RightRailLink href={link}>{text}</RightRailLink>
            </Link>
        );
    };

    renderVisibleLinks = () => {
        const links = this.renderLinks();

        return links.map(({ text, link, target, type }, index) =>
            this.renderLinkItem(text, link, target, type, index),
        );
    };

    renderLanguageSelect = () => <LanguageSelect />;

    render() {
        return (
            <FooterWrapper>
                {this.renderVisibleLinks()}
                {this.renderLanguageSelect()}
                {this.renderCopyrightText()}
                {this.renderMenu()}
            </FooterWrapper>
        );
    }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default withTranslation(['footer'])(Footer);

const CopyrightText = styled.span`
    display: ${(props) => (props.inlineCopyright ? 'inline-block' : 'block')};
`;

const FooterWrapper = styled.span`
    span {
        color: ${colors.grayDark};
        font-size: ${fontSize.sm};
        line-height: ${lineHeight.lh_13};
    }

    @media ${device.tablet} {
        margin-bottom: ${spacing.xs};
        display: block;

        span {
            font-size: ${fontSize.md};
        }
    }
`;
