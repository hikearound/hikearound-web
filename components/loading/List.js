import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

class ListLoadingState extends React.PureComponent {
    render() {
        return (
            <LoadingWrapper>
                <Skeleton
                    height={12}
                    width={120}
                    style={{ marginTop: 4, marginBottom: 4 }}
                />
                <Skeleton height={12} width={150} />
            </LoadingWrapper>
        );
    }
}

export default ListLoadingState;

export const LoadingWrapper = styled.div`
    display: block;

    span {
        display: block;
    }
`;
