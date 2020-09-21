import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url, token) =>
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            token,
        }),
        credentials: 'same-origin',
    }).then((res) => res.json());

export function withSWR(Component) {
    const WrappedComponent = function (props) {
        const router = useRouter();

        const { data } = useSWR(['/api/reset', router.query.token], fetcher);

        return <Component {...props} data={data} />;
    };

    WrappedComponent.getInitialProps = () => {
        return {
            namespacesRequired: ['reset', 'header', 'footer', 'common'],
        };
    };

    return WrappedComponent;
}

export default withSWR;
