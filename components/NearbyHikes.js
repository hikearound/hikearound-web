import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../styles/card';
import { getNearbyHikes } from '../utils/hike';
import { withTranslation, Link } from '../utils/i18n';
import { getRange } from '../utils/location';
import { RightRailLink } from '../styles/links';
import { ListHeading, UnorderedList, ListItem } from '../styles/lists';
import ListLoadingState from './loading/List';

const propTypes = {
    hid: PropTypes.string.isRequired,
    hikeCount: PropTypes.number,
    distance: PropTypes.number,
    prefetch: PropTypes.bool,
    location: PropTypes.object.isRequired,
    city: PropTypes.string.isRequired,
};

const defaultProps = {
    hikeCount: 8,
    distance: 25,
    prefetch: false,
};

class NearbyHikes extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            nearbyHikes: [],
            loading: true,
        };
    }

    async componentDidMount() {
        await this.getAndSetNearbyHikes();
    }

    async componentDidUpdate(prevProps) {
        const { hid } = this.props;

        if (prevProps.hid !== hid) {
            await this.setDefaultValues();
            await this.getAndSetNearbyHikes();
        }
    }

    setDefaultValues = async () => {
        this.setState({
            nearbyHikes: [],
            loading: true,
        });
    };

    getAndSetNearbyHikes = async () => {
        const { hikeCount, location, distance } = this.props;
        const { lat, lng } = location;

        const range = getRange(lat, lng, distance);
        const nearbyHikes = await getNearbyHikes(hikeCount, range, location);

        if (nearbyHikes) {
            this.setState({ nearbyHikes, loading: false });
        }
    };

    renderNearbyHikeLinks() {
        const { prefetch } = this.props;
        const { nearbyHikes } = this.state;

        return nearbyHikes.map(({ name, hid }, index) => (
            <ListItem key={index}>
                <Link href='[hid]' as={hid} prefetch={prefetch}>
                    <RightRailLink href={hid}>{name}</RightRailLink>
                </Link>
            </ListItem>
        ));
    }

    render() {
        const { t, city } = this.props;
        const { loading } = this.state;

        return (
            <Card noPadding>
                <ListHeading>
                    {t('card.title.nearby', { cityName: city })}
                </ListHeading>
                <UnorderedList>
                    {!loading && this.renderNearbyHikeLinks()}
                    {loading && <ListLoadingState />}
                </UnorderedList>
            </Card>
        );
    }
}

NearbyHikes.propTypes = propTypes;
NearbyHikes.defaultProps = defaultProps;

export default withTranslation('common')(NearbyHikes);
