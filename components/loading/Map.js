import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';

const propTypes = {
    hid: PropTypes.string.isRequired,
};

class MapLoadingState extends React.PureComponent {
    render() {
        const { hid } = this.props;

        return (
            <LoadingWrapper>
                <ContentLoader viewBox='0 0 650 450' uniqueKey={hid}>
                    <rect x='0' y='0' rx='5' ry='5' width='650' height='450' />
                </ContentLoader>
            </LoadingWrapper>
        );
    }
}

export default MapLoadingState;

MapLoadingState.propTypes = propTypes;

export const LoadingWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
`;
