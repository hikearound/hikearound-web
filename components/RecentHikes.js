import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from '../styles/card';
import { SecondaryHeading } from '../styles/headings';
import { getRecentHikes } from '../utils/hike';
import { withTranslation, Link } from '../utils/i18n';
import { RightRailLink } from '../styles/links';
import { spacing } from '../constants/spacing';
import { device } from '../constants/breakpoints';
import { colors } from '../constants/colors';

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

        return recentHikes.map(({ name, id }, index) => (
            <HikeLinkParent key={index}>
                <Link href='[id]' as={id} prefetch={prefetch}>
                    <HikeLink href={id}>{name}</HikeLink>
                </Link>
            </HikeLinkParent>
        ));
    }

    render() {
        const { t } = this.props;

        return (
            <Card noPadding>
                <RecentHikesHeading>
                    {t('card.title.recent')}
                </RecentHikesHeading>
                <HikeLinkContainer>
                    {this.renderRecentHikeLinks()}
                </HikeLinkContainer>
            </Card>
        );
    }
}

RecentHikes.propTypes = propTypes;
RecentHikes.defaultProps = defaultProps;

export default withTranslation('common')(RecentHikes);

const HikeLinkContainer = styled.div`
    padding: 0 ${spacing.md} ${spacing.md} ${spacing.md};

    @media ${device.tablet} {
        border-top: 3px solid ${colors.grayLight};
        padding-top: ${spacing.md};
    }
`;

const HikeLinkParent = styled.div`
    display: block;
    margin-top: ${spacing.xs};

    &:first-child {
        margin-top: 0;
    }
`;

const RecentHikesHeading = styled(SecondaryHeading)`
    padding: ${spacing.md} ${spacing.md} ${spacing.sm} ${spacing.md};

    @media ${device.tablet} {
        padding-bottom: ${spacing.md};
    }
`;

const HikeLink = styled(RightRailLink)`
    margin: 0;
`;
