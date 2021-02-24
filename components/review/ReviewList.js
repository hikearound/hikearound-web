import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
import ReviewListItem from './ReviewListItem';

const propTypes = {
    reviews: PropTypes.array.isRequired,
};

class ReviewList extends React.Component {
    renderList = () => {
        const { reviews } = this.props;

        const reviewList = reviews.map(
            ({ hid, id, rating, review, savedOn, user, userLikes }) => (
                <ReviewListItem
                    key={id}
                    hid={hid}
                    rid={id}
                    rating={rating}
                    review={review}
                    savedOn={savedOn}
                    user={user}
                    userLikes={userLikes}
                />
            ),
        );

        return reviewList;
    };

    render() {
        return this.renderList();
    }
}

ReviewList.propTypes = propTypes;

export default withTranslation(['common', 'user'])(ReviewList);
