import React from 'react';
import { Section } from '../../../styles/landing';
import TextSection from '../Text';
import AppStoreBadge from '../Badge';

class DownloadSection extends React.PureComponent {
    renderBadge = () => {
        return <AppStoreBadge />;
    };

    render() {
        return (
            <Section offset='true' marginTop marginBottom>
                <TextSection
                    title='Adventure awaits.'
                    description='Great hikes are waiting to be discovered. Download the app today to get started.'
                    renderExtra={this.renderBadge()}
                    centered
                />
            </Section>
        );
    }
}

export default DownloadSection;
