import React from 'react';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';

class UnsubscribeLoadingState extends React.PureComponent {
    render() {
        return (
            <LoadingWrapper>
                <Skeleton variant='text' />
                <Skeleton variant='text' width={300} />
            </LoadingWrapper>
        );
    }
}

export default UnsubscribeLoadingState;

export const LoadingWrapper = styled.div`
    display: block;
`;
