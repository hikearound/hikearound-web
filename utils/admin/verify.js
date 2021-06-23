import * as admin from 'firebase-admin';
import { initFirebaseAdmin } from '@utils/firebase/admin';

export async function checkUserExists(uid) {
    const userSnapshot = await admin
        .firestore()
        .collection('users')
        .doc(uid)
        .get();

    return userSnapshot.data();
}

export async function updateUserRecord(uid) {
    admin.auth().updateUser(uid, {
        emailVerified: true,
    });

    admin
        .firestore()
        .collection('users')
        .doc(uid)
        .set({ emailVerified: true }, { merge: true });
}

export async function verify(uid) {
    initFirebaseAdmin();

    const user = await checkUserExists(uid);

    if (user) {
        updateUserRecord(uid);
        return true;
    }

    return false;
}
