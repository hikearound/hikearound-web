import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
import { SecondaryHeading } from '../../styles/headings';
import { Card } from '../../styles/card';

const propTypes = {
    client: PropTypes.string,
    slot: PropTypes.string,
    format: PropTypes.string,
    responsive: PropTypes.bool,
};

const defaultProps = {
    client: 'ca-pub-0600907327424384',
    slot: '9374444460',
    format: 'rectangle',
    responsive: true,
};

class Ad extends React.PureComponent {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    renderAd = () => {
        const { client, slot, format, responsive } = this.props;

        return (
            <ins
                className='adsbygoogle'
                style={{ display: 'block' }}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
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

Ad.propTypes = propTypes;
Ad.defaultProps = defaultProps;

export default withTranslation('common')(Ad);
