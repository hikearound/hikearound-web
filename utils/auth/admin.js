import * as admin from 'firebase-admin';
import serviceAccount from '../../keys/firebase.json';

export function initAdmin() {
    const config = {
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    };

    if (!admin.apps.length) {
        admin.initializeApp(config);
    }
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

export async function verifyToken(idToken) {
    initAdmin();

    const user = await admin.auth().verifyIdToken(idToken);

    if (user.uid) {
        updateUserRecord(user.uid);
        return true;
    }

    return false;
}
