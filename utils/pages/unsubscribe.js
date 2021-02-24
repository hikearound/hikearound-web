export const fetcher = (url, token, type) =>
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            token,
            type,
        }),
        credentials: 'same-origin',
    }).then((res) => res.json());

export default fetcher;
