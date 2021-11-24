import { initFirebaseAdmin } from '@utils/firebase/admin';
import { checkUserExists } from '@utils/admin/verify';
import { getFirestore, doc, getDoc, setDoc } from 'firebase-admin/firestore';

export async function getUserSubscriptions(uid) {
    const db = getFirestore();

    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    const userData = userSnapshot.data();
    const { notifs } = userData;

    return notifs;
}

export async function updateUserSubscriptions(uid, type, subscriptions) {
    const db = getFirestore();

    subscriptions.email[type].enabled = false;

    const userRef = doc(db, 'users', uid);
    setDoc(userRef, { notifs: subscriptions }, { merge: true });
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
