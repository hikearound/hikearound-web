import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'next-i18next';
import Link from 'next/link';
import { colors } from '../../constants/colors';
import { fontSize, lineHeight } from '../../constants/type';
import { RightRailLink } from '../../styles/links';
import LanguageSelect from '../i18n/Select';
import { device } from '../../constants/breakpoints';

const propTypes = {
    inlineCopyright: PropTypes.bool,
    centered: PropTypes.bool,
};

const defaultProps = {
    inlineCopyright: false,
    centered: false,
};

class Footer extends React.PureComponent {
    renderCopyrightText = () => {
        const { inlineCopyright, t } = this.props;
        const date = new Date();

        return (
            <CopyrightText inlineCopyright={inlineCopyright}>
                {t('label.copyright', { year: date.getFullYear() })}
            </CopyrightText>
        );
    };

    renderLinks = () => {
        const { t } = this.props;

        return [
            {
                text: t('link.about'),
                link: '/about',
                type: 'router',
            },
            {
                text: t('link.contact'),
                link: 'mailto:support@tryhikearound.com',
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
        ];
    };

    render() {
        const { centered } = this.props;
        const links = this.renderLinks();

        return (
            <FooterWrapper centered={centered}>
                {links.map(({ text, link, type }, index) => {
                    if (type === 'href') {
                        return (
                            <RightRailLink href={link} key={index}>
                                {text}
                            </RightRailLink>
                        );
                    }
                    return (
                        <Link href={link} key={index}>
                            <RightRailLink href={link}>{text}</RightRailLink>
                        </Link>
                    );
                })}
                <LanguageSelect />
                {this.renderCopyrightText()}
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
    text-align: ${(props) => (props.centered ? 'center' : 'left')};

    span {
        color: ${colors.grayDark};
        font-size: ${fontSize.sm};
        line-height: ${lineHeight.lh_13};
    }

    @media ${device.tablet} {
        span {
            font-size: ${fontSize.md};
        }
    }
`;
