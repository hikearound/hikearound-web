import React from 'react';
import { SecondaryHeading } from '../../styles/headings';
import { Card } from '../../styles/card';
import { withTranslation } from '../../utils/i18n';

class Ad extends React.PureComponent {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    renderAd = () => {
        return (
            <ins
                className='adsbygoogle'
                style={{ display: 'block' }}
                data-ad-client='ca-pub-0600907327424384'
                data-ad-slot='9374444460'
                data-ad-format='rectangle'
                data-full-width-responsive='true'
            />
        );
    };

    render() {
        const { t } = this.props;

        return (
            <Card>
                <SecondaryHeading>{t('card.title.ad')}</SecondaryHeading>
                {this.renderAd()}
            </Card>
        );
    }
}

export default withTranslation('common')(Ad);
