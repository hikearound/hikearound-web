import React from 'react';
import Head from 'next/head';
import { typeface } from '../../constants/type';
import colors from '../../constants/colors';

class Header extends React.PureComponent {
    render() {
        return (
            <div>
                <Head>
                    <title>Hikearound - Get out there and hike something</title>
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1'
                    />
                    <meta charSet='utf-8' />
                </Head>
                <style jsx global>{`
                    body {
                        background: ${colors.grayUltraLight};
                        color: ${colors.blackText};
                        font-family: ${typeface.sansSerif};
                    }
                `}</style>
            </div>
        );
    }
}

export default Header;
