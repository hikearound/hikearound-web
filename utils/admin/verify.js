/* eslint-disable import/no-unresolved */
import { db } from '@utils/firebase/admin';
import { getAuth } from 'firebase-admin/auth';
import { doc, getDoc, setDoc } from 'firebase-admin/firestore';

export async function checkUserExists(uid) {
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    return userSnapshot.data();
}

export async function updateUserRecord(uid) {
    getAuth().updateUser(uid, {
        emailVerified: true,
    });

    const userRef = doc(db, 'users', uid);
    setDoc(userRef, { emailVerified: true }, { merge: true });
}

export async function verify(uid) {
    const user = await checkUserExists(uid);

    if (user) {
        updateUserRecord(uid);
        return true;
    }

    return false;
}
