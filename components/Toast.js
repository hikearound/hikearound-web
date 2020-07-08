import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { fontSize } from '../constants/type';
import { borderRadius } from '../constants/dimensions';
import { transforms } from '../constants/toast';

const propTypes = {
    children: PropTypes.string.isRequired,
    transitionDuration: PropTypes.number.isRequired,
    transitionState: PropTypes.string.isRequired,
};

class Toast extends React.PureComponent {
    render() {
        const { children, transitionDuration, transitionState } = this.props;

        return (
            <ToastWrapper
                transitionDuration={transitionDuration}
                transitionState={transitionState}
            >
                <Text>{children}</Text>
            </ToastWrapper>
        );
    }
}

Toast.propTypes = propTypes;

export default Toast;

const ToastWrapper = styled.div`
    align-items: center;
    background-color: ${colors.purple};
    color: ${colors.white};
    border-radius: ${borderRadius.sm};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: ${spacing.sm};
    pointer-events: initial;
    transition-property: transform;
    transition-duration: ${(props) => props.transitionDuration}ms;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
    transform-origin: bottom;
    z-index: 2;
    transform: ${(props) => transforms[props.transitionState]};
    min-width: 250px;
`;

const Text = styled.div`
    font-size: ${fontSize.md};
    padding: 12px ${spacing.md};
    margin: 0 auto;
`;
