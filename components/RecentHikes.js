import React from 'react';
import { Card } from '../styles/card';
import { SecondaryHeading } from '../styles/headings';

class RecentHikes extends React.PureComponent {
    render() {
        return (
            <Card>
                <SecondaryHeading>Recent Hikes</SecondaryHeading>
            </Card>
        );
    }
}

export default RecentHikes;
