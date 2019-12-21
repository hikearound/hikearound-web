import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import colors from '../../constants/colors';
import { fontSize, lineHeight } from '../../constants/type';
import { Card } from '../../styles/card';
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
            <Card hideGutter>
                {footerLinks.map(({ text, link }, index) => (
                    <Link href={link} key={index}>
                        <RightRailLink href={link}>{text}</RightRailLink>
                    </Link>
                ))}
                {this.renderCopyrightText()}
            </Card>
        );
    }
}

export default Footer;

const CopyrightText = styled.a`
    display: block;
    color: ${colors.grayDark};
    font-size: ${fontSize.sm};
    line-height: ${lineHeight.lh_13};
`;
