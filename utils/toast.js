import React from 'react';
import { useToasts } from 'react-toast-notifications';

export function withToast(Component) {
    return function WrappedComponent(props) {
        const { addToast } = useToasts();
        return <Component {...props} addToast={addToast} />;
    };
}

export default withToast;
