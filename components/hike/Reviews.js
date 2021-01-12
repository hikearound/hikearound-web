import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from '../../styles/card';
import { SecondaryHeading } from '../../styles/headings';
import { withTranslation } from '../../utils/i18n';
import { getRecentReviews } from '../../utils/review';
import ReviewList from '../review/ReviewList';
import { colors } from '../../constants/colors';
import { device } from '../../constants/breakpoints';
import ReviewLoadingState from '../loading/Review';

const propTypes = {
    hid: PropTypes.string.isRequired,
};

class Reviews extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: true,
            reviews: [],
            sortDirection: 'desc',
            querySize: 5,
            maybeShowEmptyState: false,
        };
    }

    async componentDidMount() {
        await this.getReviewData();
    }

    async componentDidUpdate(prevProps) {
        const { hid } = this.props;

        if (prevProps.hid !== hid) {
            this.resetEmptyState();
            await this.getReviewData();
        }
    }

    getReviewData = async () => {
        const { t, hid } = this.props;
        const { sortDirection, querySize } = this.state;
        const reviews = await getRecentReviews(
            t,
            hid,
            sortDirection,
            querySize,
        );

        this.setState({ reviews, loading: false });
        this.maybeSetEmptyState(reviews);
    };

    resetEmptyState = () => {
        this.setState({ maybeShowEmptyState: false });
    };

    maybeSetEmptyState = async (reviews) => {
        if (reviews.length === 0) {
            this.setState({ maybeShowEmptyState: true });
        }
    };

    renderReviewList = () => {
        const { reviews, maybeShowEmptyState } = this.state;

        if (maybeShowEmptyState) {
            return this.renderEmptyState();
        }

        return <ReviewList reviews={reviews} />;
    };

    renderEmptyState = () => {
        const { t } = this.props;

        return <CardContent>{t('hike:review.empty')}</CardContent>;
    };

    render() {
        const { t } = this.props;
        const { loading } = this.state;

        return (
            <Card lastChild noPadding>
                <SecondaryHeading isCard>
                    {t('card.title.reviews')}
                </SecondaryHeading>
                <CardContentBorder />
                {loading && <ReviewLoadingState />}
                {!loading && this.renderReviewList()}
            </Card>
        );
    }
}

Reviews.propTypes = propTypes;

export default withTranslation(['common', 'hike'])(Reviews);

const CardContentBorder = styled.div`
    display: block;
    border-top: 1px solid ${colors.gray};

    @media ${device.tablet} {
        border-color: ${colors.grayLight};
        border-top-width: 3px;
    }
`;

const CardContent = styled.div`
    display: block;
    padding: 16px;
`;
