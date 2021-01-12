import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

class MapLoadingState extends React.PureComponent {
    render() {
        return (
            <LoadingWrapper>
                <Skeleton height={450} width={650} />
            </LoadingWrapper>
        );
    }
}

export default MapLoadingState;

export const LoadingWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
`;
