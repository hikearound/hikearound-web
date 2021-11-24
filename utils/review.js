import {
    getFirestore,
    collection,
    query,
    where,
    doc,
    getDoc,
    getDocs,
    orderBy,
    limit,
} from 'firebase/firestore';
import { getUserProfileData } from '@utils/user';
import { avatar } from '@constants/images';

const db = getFirestore();

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
    const reviewRef = doc(db, 'reviews', rid);
    let reviewData = await getDoc(reviewRef);

    reviewData = reviewData.data();
    reviewData.id = rid;

    return reviewData;
}

export function getRecentReviewsQuery(hid, sortDirection, querySize) {
    return query(
        collection(db, 'reviews'),
        where('hid', '==', hid),
        orderBy('savedOn', sortDirection),
        limit(querySize),
    );
}

export async function getRecentReviews(t, hid, sortDirection, querySize) {
    const q = getRecentReviewsQuery(hid, sortDirection, querySize);
    const querySnapshot = await getDocs(q);

    let recentReviews = [];

    querySnapshot.forEach((review) => {
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
