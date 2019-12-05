import React from 'react';
import { SecondaryHeading } from '../../styles/headings';
import { Card } from '../../styles/card';

class Ad extends React.PureComponent {
    render() {
        return (
            <Card>
                <SecondaryHeading>Advertisement</SecondaryHeading>
                <ins className='adsbygoogle' />
            </Card>
        );
    }
}

export default Ad;
