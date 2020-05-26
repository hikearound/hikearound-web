import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontSize, lineHeight } from '../../constants/type';
import { Card } from '../../styles/card';
import { SecondaryHeading } from '../../styles/headings';
import spacing from '../../constants/spacing';
import { device } from '../../constants/breakpoints';
import colors from '../../constants/colors';

const propTypes = {
    hike: PropTypes.object,
};

const defaultProps = {
    hike: {},
};

class Stats extends React.PureComponent {
    renderHikeStats() {
        const { hike } = this.props;

        return (
            <StatsContainer>
                <Stat>
                    <Label>Distance:</Label>
                    <StatData>{hike.distance} miles</StatData>
                </Stat>
                <Stat>
                    <Label>Elevation:</Label>
                    <StatData>{hike.elevation} feet</StatData>
                </Stat>
                <Stat>
                    <Label>Route:</Label>
                    <StatData>{hike.route}</StatData>
                </Stat>
                <Stat>
                    <Label>Difficulty:</Label>
                    <StatData>{hike.difficulty}</StatData>
                </Stat>
            </StatsContainer>
        );
    }

    render() {
        return (
            <Card noPadding>
                <RecentHikesHeading>Hike Stats</RecentHikesHeading>
                {this.renderHikeStats()}
            </Card>
        );
    }
}

Stats.propTypes = propTypes;
Stats.defaultProps = defaultProps;

export default Stats;

const StatsContainer = styled.div`
    padding: 0 ${spacing.md} ${spacing.md} ${spacing.md};

    @media ${device.tablet} {
        border-top: 3px solid ${colors.grayLight};
        padding-top: ${spacing.md};
    }
`;

const Stat = styled.div`
    display: block;
    color: ${colors.grayDark};
    line-height: ${lineHeight.lh_13};
    margin-right: ${spacing.sm};
    font-size: ${fontSize.sm};
    margin-top: 4px;

    &:first-child {
        margin-top: 0;
    }

    @media ${device.tablet} {
        display: inline-block;
        margin-top: 0;
    }
`;

const Label = styled.div`
    display: inline-block;
    font-size: ${fontSize.sm};
    margin-right: ${spacing.xs};
`;

const StatData = styled.div`
    display: inline-block;
    font-size: ${fontSize.sm};
    color: ${colors.blackText};
`;

const RecentHikesHeading = styled(SecondaryHeading)`
    padding: ${spacing.md} ${spacing.md} ${spacing.sm} ${spacing.md};

    @media ${device.tablet} {
        padding-bottom: ${spacing.md};
    }
`;
