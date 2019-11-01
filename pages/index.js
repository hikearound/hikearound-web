import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

export default function Index() {
    return (
        <RootView>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <meta charSet='utf-8' />
            </Head>
            <style jsx global>{`
                body {
                    background: #fff;
                    color: #000;
                }
            `}</style>
            <Title>Hikearound</Title>
        </RootView>
    );
}

const Title = styled.h1`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary};
`;

const RootView = styled.div`
    background-color: #fff;
`;
