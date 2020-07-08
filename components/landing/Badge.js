import React from 'react';
import styled from 'styled-components';
import { componentSpacing } from '../../constants/landing';

class AppStoreBadge extends React.PureComponent {
    render() {
        return (
            <Link href='/' target='_blank' rel='noreferrer'>
                <Badge src='/images/external/app-store-badge.svg' />
            </Link>
        );
    }
}

export default AppStoreBadge;

export const Link = styled.a`
    display: inline-block;
    margin-top: ${componentSpacing.sm};
    width: 125px;
`;

export const Badge = styled.img`
    width: 125px;
`;
