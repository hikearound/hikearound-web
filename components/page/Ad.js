import React from 'react';
import { SecondaryHeading } from '../../styles/headings';
import { Card } from '../../styles/card';
import { withTranslation } from '../../utils/i18n';

class Ad extends React.PureComponent {
    render() {
        const { t } = this.props;

        return (
            <Card>
                <SecondaryHeading>{t('card.title.ad')}</SecondaryHeading>
                <ins className='adsbygoogle' />
            </Card>
        );
    }
}

export default withTranslation('common')(Ad);
