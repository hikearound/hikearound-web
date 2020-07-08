import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { colors } from '../../constants/colors';
import { fontSize, lineHeight } from '../../constants/type';
import { RightRailLink } from '../../styles/links';

const footerLinks = [
    {
        text: 'About',
        link: '/about',
    },
    {
        text: 'Contact',
        link: '/contact',
    },
    {
        text: 'Privacy Policy',
        link: '/privacy',
    },
    {
        text: 'Terms',
        link: '/terms',
    },
];

const propTypes = {
    inlineCopyright: PropTypes.bool,
};

const defaultProps = {
    inlineCopyright: false,
};

class Footer extends React.PureComponent {
    renderCopyrightText = () => {
        const { inlineCopyright } = this.props;
        const date = new Date();

        return (
            <CopyrightText inlineCopyright={inlineCopyright}>
                © Hikearound Inc. {date.getFullYear()}
            </CopyrightText>
        );
    };

    render() {
        return (
            <>
                {footerLinks.map(({ text, link }, index) => (
                    <Link href={link} key={index}>
                        <RightRailLink href={link}>{text}</RightRailLink>
                    </Link>
                ))}
                {this.renderCopyrightText()}
            </>
        );
    }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;

const CopyrightText = styled.a`
    display: ${(props) => (props.inlineCopyright ? 'inline-block' : 'block')};
    color: ${colors.grayDark};
    font-size: ${fontSize.sm};
    line-height: ${lineHeight.lh_13};
`;
