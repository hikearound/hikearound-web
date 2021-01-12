import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

class GalleryLoadingState extends React.PureComponent {
    render() {
        return (
            <LoadingWrapper>
                <Skeleton height={90} width={120} />
                <Skeleton height={90} width={120} style={{ marginLeft: 10 }} />
                <Skeleton height={90} width={120} style={{ marginLeft: 10 }} />
            </LoadingWrapper>
        );
    }
}

export default GalleryLoadingState;

export const LoadingWrapper = styled.div`
    display: flex;
    overflow: hidden;
    position: relative;
    top: -3px;
`;
