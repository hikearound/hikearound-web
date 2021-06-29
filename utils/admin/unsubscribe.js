import * as admin from 'firebase-admin';
import { initFirebaseAdmin } from '@utils/firebase/admin';
import { checkUserExists } from '@utils/admin/verify';

export async function getUserSubscriptions(uid) {
    initFirebaseAdmin();

    const userSnapshot = await admin
        .firestore()
        .collection('users')
        .doc(uid)
        .get();

    const userData = userSnapshot.data();
    const { notifs } = userData;

    return notifs;
}

export async function updateUserSubscriptions(uid, type, subscriptions) {
    subscriptions.email[type].enabled = false;

    admin
        .firestore()
        .collection('users')
        .doc(uid)
        .set({ notifs: subscriptions }, { merge: true });
}

export async function unsubscribe(uid, type) {
    initFirebaseAdmin();

    const user = await checkUserExists(uid);

    if (user) {
        const subscriptions = await getUserSubscriptions(uid);

        if (subscriptions.email) {
            updateUserSubscriptions(uid, type, subscriptions);
            return true;
        }
    }

    return false;
}
