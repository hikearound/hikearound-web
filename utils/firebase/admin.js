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

export function initFirebaseAdmin() {
    initAdmin();
}
