import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withTranslation } from '../../utils/i18n';
import { colors } from '../../constants/colors';
import { fontSize, lineHeight } from '../../constants/type';
import { RightRailLink } from '../../styles/links';
import LanguageSelect from '../i18n/Select';

const propTypes = {
    inlineCopyright: PropTypes.bool,
};

const defaultProps = {
    inlineCopyright: false,
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
            },
            {
                text: t('link.contact'),
                link: '/contact',
            },
            {
                text: t('link.privacy'),
                link: '/privacy',
            },
            {
                text: t('link.terms'),
                link: '/terms',
            },
        ];
    };

    render() {
        const links = this.renderLinks();

        return (
            <FooterWrapper>
                {links.map(({ text, link }, index) => (
                    <Link href={link} key={index}>
                        <RightRailLink href={link}>{text}</RightRailLink>
                    </Link>
                ))}
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
    span {
        color: ${colors.grayDark};
        font-size: ${fontSize.sm};
        line-height: ${lineHeight.lh_13};
    }
`;
