import React from 'react';
import { useMap } from 'react-mapkit';

export function withMap(Component) {
    return function WrappedComponent(props) {
        const { map, mapProps, setCenter, setRegion } = useMap();

        return (
            <Component
                {...props}
                map={map}
                mapProps={mapProps}
                setCenter={setCenter}
                setRegion={setRegion}
            />
        );
    };
}

export default withMap;
