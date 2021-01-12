import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

class ReviewLoadingState extends React.PureComponent {
    render() {
        return (
            <LoadingWrapper>
                <Skeleton
                    circle
                    height={38}
                    width={38}
                    style={{ verticalAlign: 'top' }}
                />
                <ProfileWrapper style={{ marginTop: 2 }}>
                    <Skeleton
                        height={12}
                        width={120}
                        style={{ marginBottom: 4 }}
                    />
                    <Skeleton height={12} width={150} />
                </ProfileWrapper>
                <ReviewSection>
                    <Skeleton
                        height={12}
                        width={90}
                        style={{ marginBottom: 4, marginTop: 4 }}
                    />
                    <Skeleton height={12} width={250} />
                </ReviewSection>
            </LoadingWrapper>
        );
    }
}

export default ReviewLoadingState;

export const LoadingWrapper = styled.div`
    overflow: hidden;
    position: relative;
    margin: 16px;
`;

export const ProfileWrapper = styled.div`
    margin-left: 8px;
    display: inline-block;

    span {
        display: block;
    }
`;

export const ReviewSection = styled.div`
    display: block;
    margin-top: 4px;

    span {
        display: block;
    }
`;
