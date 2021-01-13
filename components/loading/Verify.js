import React from 'react';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';

class VerifyLoadingState extends React.PureComponent {
    render() {
        return (
            <LoadingWrapper>
                <Skeleton variant='text' width={300} />
            </LoadingWrapper>
        );
    }
}

export default VerifyLoadingState;

export const LoadingWrapper = styled.div`
    display: block;
`;
