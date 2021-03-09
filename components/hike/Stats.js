import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'next-i18next';
import { fontSize, lineHeight } from '../../constants/type';
import { Card } from '../../styles/card';
import { SecondaryHeading } from '../../styles/headings';
import { spacing } from '../../constants/spacing';
import { device } from '../../constants/breakpoints';
import { colors } from '../../constants/colors';
import { gutterWidth } from '../../constants/dimensions';

const propTypes = {
    hike: PropTypes.object,
};

const defaultProps = {
    hike: {},
};

class Stats extends React.PureComponent {
    renderHikeStats() {
        const { t, hike } = this.props;
        const { route, elevation, distance, difficulty } = hike;

        return (
            <StatsContainer>
                <Stat>
                    <Label>{t('label.distance')}:</Label>
                    <StatData>
                        {t('measurement.distance', { distance })}
                    </StatData>
                </Stat>
                <Stat>
                    <Label>{t('label.elevation')}:</Label>
                    <StatData>
                        {t('measurement.elevation', { elevation })}
                    </StatData>
                </Stat>
                <Stat>
                    <Label>{t('label.route')}:</Label>
                    <StatData>{t(`routeType.${route.toLowerCase()}`)}</StatData>
                </Stat>
                <Stat>
                    <Label>{t('label.difficulty')}:</Label>
                    <StatData>
                        {t(`difficulty.${difficulty.toLowerCase()}`)}
                    </StatData>
                </Stat>
            </StatsContainer>
        );
    }

    render() {
        const { t } = this.props;

        return (
            <Card noPadding>
                <RecentHikesHeading>
                    {t('common:card.title.stats')}
                </RecentHikesHeading>
                {this.renderHikeStats()}
            </Card>
        );
    }
}

Stats.propTypes = propTypes;
Stats.defaultProps = defaultProps;

export default withTranslation(['hike', 'common'])(Stats);

const StatsContainer = styled.div`
    padding: 0 ${spacing.md} ${spacing.md} ${spacing.md};

    @media ${device.tablet} {
        border-top: ${gutterWidth.mobile} solid ${colors.grayLight};
        padding-top: ${spacing.md};
    }
`;

const Stat = styled.div`
    display: block;
    color: ${colors.grayDark};
    line-height: ${lineHeight.lh_13};
    margin-right: ${spacing.sm};
    font-size: ${fontSize.sm};
    margin-top: ${spacing.xs};

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

    @media ${device.tablet} {
        font-size: ${fontSize.md};
    }
`;

const StatData = styled.div`
    display: inline-block;
    font-size: ${fontSize.sm};
    color: ${colors.blackText};

    @media ${device.tablet} {
        font-size: ${fontSize.md};
    }
`;

const RecentHikesHeading = styled(SecondaryHeading)`
    padding: ${spacing.md} ${spacing.md} ${spacing.sm} ${spacing.md};

    @media ${device.tablet} {
        padding-bottom: ${spacing.md};
    }
`;
