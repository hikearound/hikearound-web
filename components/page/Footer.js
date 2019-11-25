import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import { fontSize, lineHeight } from '../../constants/type';
import { Card } from '../../styles/card';

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

class Footer extends React.PureComponent {
    renderCopyrightText = () => {
        const date = new Date();
        return (
            <CopyrightText>
                © Hikearound Inc. {date.getFullYear()}
            </CopyrightText>
        );
    };

    render() {
        return (
            <Card>
                {footerLinks.map(({ text, link }, index) => (
                    <Link href={link} key={index}>
                        <FooterLink>{text}</FooterLink>
                    </Link>
                ))}
                {this.renderCopyrightText()}
            </Card>
        );
    }
}

export default Footer;

const FooterLink = styled.a`
    display: inline-block;
    color: ${colors.grayDark};
    line-height: ${lineHeight.lh_13};
    cursor: pointer;
    text-decoration: none;
    margin-right: ${spacing.sm};
    font-size: ${fontSize.sm};

    &:hover {
        text-decoration: underline;
    }
`;

const CopyrightText = styled.div`
    display: block;
    color: ${colors.grayDark};
    font-size: ${fontSize.sm};
    margin-top: ${spacing.xs};
`;
