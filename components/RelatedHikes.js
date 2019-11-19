import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import { fontSize, fontWeight } from '../constants/type';
import { borderRadius } from '../constants/dimensions';

class RelatedHikes extends React.PureComponent {
    render() {
        return (
            <RelatedHikesRoot>
                <ContainerTitle>Related Hikes</ContainerTitle>
            </RelatedHikesRoot>
        );
    }
}

export default RelatedHikes;

const ContainerTitle = styled.div`
    font-size: ${fontSize.md};
    font-weight: ${fontWeight.regular};
    color: ${colors.grayDark};
`;

const RelatedHikesRoot = styled.div`
    background-color: ${colors.white};
    border: 1px solid ${colors.gray};
    border-radius: ${borderRadius.sm};
    padding: ${spacing.md};
`;
