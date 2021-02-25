import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
import Link from 'next/link';
import { Card } from '../styles/card';
import { getRecentHikes } from '../utils/hike';
import { RightRailLink } from '../styles/links';
import { ListHeading, UnorderedList, ListItem } from '../styles/lists';

const propTypes = {
    hikeCount: PropTypes.number,
    prefetch: PropTypes.bool,
};

const defaultProps = {
    hikeCount: 5,
    prefetch: false,
};

class RecentHikes extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            recentHikes: [],
        };
    }

    async componentDidMount() {
        const { hikeCount } = this.props;
        const recentHikes = await getRecentHikes(hikeCount);

        if (recentHikes) {
            this.setState({ recentHikes });
        }
    }

    renderRecentHikeLinks() {
        const { prefetch } = this.props;
        const { recentHikes } = this.state;

        return recentHikes.map(({ name, hid }, index) => (
            <ListItem key={index}>
                <Link href='[hid]' as={hid} prefetch={prefetch}>
                    <RightRailLink href={hid}>{name}</RightRailLink>
                </Link>
            </ListItem>
        ));
    }

    render() {
        const { t } = this.props;

        return (
            <Card noPadding>
                <ListHeading>{t('card.title.recent')}</ListHeading>
                <UnorderedList>{this.renderRecentHikeLinks()}</UnorderedList>
            </Card>
        );
    }
}

RecentHikes.propTypes = propTypes;
RecentHikes.defaultProps = defaultProps;

export default withTranslation('common')(RecentHikes);
