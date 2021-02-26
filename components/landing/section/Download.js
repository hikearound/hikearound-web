import React from 'react';
import { withTranslation } from 'next-i18next';
import { Section } from '../../../styles/landing';
import TextSection from '../Text';
import AppStoreBadge from '../Badge';

class DownloadSection extends React.PureComponent {
    renderBadge = () => <AppStoreBadge />;

    render() {
        const { t } = this.props;

        return (
            <Section offset='true' marginTop marginBottom>
                <TextSection
                    title={t('section.download.title')}
                    description={t('section.download.description')}
                    renderExtra={this.renderBadge()}
                    centered
                />
            </Section>
        );
    }
}

export default withTranslation('landing')(DownloadSection);
