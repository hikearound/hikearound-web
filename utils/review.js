import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/storage';
import { getUserProfileData } from './user';
import { avatar } from '../constants/images';

export async function buildReviewArray(t, data) {
    const reviews = [];

    for (const review of data) {
        const userData = await getUserProfileData(t, review.uid);

        if (!userData.photoURL) {
            userData.photoURL = avatar;
        }

        review.user = {
            uid: review.uid,
            name: userData.name,
            location: userData.location,
            photoURL: userData.photoURL,
        };

        reviews[review.id] = review;
        reviews.push(review);
    }

    if (data.length === 0) {
        return [];
    }

    return reviews;
}

export async function getReviewData(rid) {
    let reviewData = await firebase
        .firestore()
        .collection('reviews')
        .doc(rid)
        .get();

    reviewData = reviewData.data();
    reviewData.id = rid;

    return reviewData;
}

export function getReviewRef(hid, sortDirection, querySize) {
    return firebase
        .firestore()
        .collection('reviews')
        .where('hid', '==', hid)
        .orderBy('savedOn', sortDirection)
        .limit(querySize);
}

export async function getRecentReviews(t, hid, sortDirection, querySize) {
    const reviewRef = getReviewRef(hid, sortDirection, querySize);
    const querySnapshot = await reviewRef.get();

    let recentReviews = [];

    await querySnapshot.forEach((review) => {
        if (review.exists) {
            const reviewData = review.data() || {};
            reviewData.id = review.id;

            const reduced = {
                key: review.id,
                ...reviewData,
            };

            recentReviews.push(reduced);
        }
    });

    recentReviews = await buildReviewArray(t, recentReviews);
    return recentReviews;
}
