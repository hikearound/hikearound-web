import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { device } from '../../constants/breakpoints';

class LoadingCard extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        let dimensions = {
            height: 225,
            width: 355,
        };

        if (isMobile) {
            dimensions = {
                height: 200,
                width: 300,
            };
        }

        this.state = { dimensions };
    }

    render() {
        const { dimensions } = this.state;

        return (
            <LoadingCardWrapper>
                <Skeleton
                    variant='rect'
                    width={dimensions.width}
                    height={dimensions.height}
                />
            </LoadingCardWrapper>
        );
    }
}

export default LoadingCard;

const LoadingCardWrapper = styled.div`
    span {
        border-radius: 4px;
        margin: 40px 10px 80px;
    }

    @media ${device.tablet} {
        span {
            margin-bottom: 40px;
        }
    }
`;
