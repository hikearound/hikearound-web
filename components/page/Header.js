import React from 'react';
import Head from 'next/head';

class Header extends React.PureComponent {
    render() {
        return (
            <Head>
                <title>Hikearound - Get out there and hike something</title>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <meta charSet='utf-8' />
            </Head>
        );
    }
}

export default Header;
