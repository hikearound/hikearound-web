import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url, token) =>
    fetch(url, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json', token }),
        credentials: 'same-origin',
    }).then((res) => res.json());

export function withSWR(Component) {
    return function WrappedComponent(props) {
        const router = useRouter();
        const { idToken } = router.query;

        const { data, error } = useSWR(
            idToken ? ['/api/verify', idToken] : null,
            fetcher,
        );

        return <Component {...props} data={data} error={error} />;
    };
}

export default withSWR;
