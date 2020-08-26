import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url, token, type) =>
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            token,
            type,
        }),
        credentials: 'same-origin',
    }).then((res) => res.json());

export function withSWR(Component) {
    const WrappedComponent = function (props) {
        const router = useRouter();

        const { data } = useSWR(
            ['/api/unsubscribe', router.query.token, router.query.type],
            fetcher,
        );

        return <Component {...props} data={data} />;
    };

    WrappedComponent.getInitialProps = () => {
        return {
            namespacesRequired: [
                'unsubscribe',
                'header',
                'footer',
                'notifications',
            ],
        };
    };

    return WrappedComponent;
}

export default withSWR;
