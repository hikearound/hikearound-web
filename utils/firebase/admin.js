/* eslint-disable import/no-unresolved */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let privateKey = process.env.FIREBASE_PRIVATE_KEY;
privateKey = privateKey.replace(/\\n/g, '\n');

const config = {
    credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

export const app = initializeApp(config);
export const db = getFirestore();
export const auth = getAuth();
