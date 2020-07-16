import * as admin from 'firebase-admin';

export function initAdmin() {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    privateKey = privateKey.replace(/\\n/g, '\n');

    const config = {
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey,
        }),
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
