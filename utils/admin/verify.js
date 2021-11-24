import { initFirebaseAdmin } from '@utils/firebase/admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase-admin/firestore';

export async function checkUserExists(uid) {
    const db = getFirestore();

    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    return userSnapshot.data();
}

export async function updateUserRecord(uid) {
    const db = getFirestore();

    getAuth().updateUser(uid, {
        emailVerified: true,
    });

    const userRef = doc(db, 'users', uid);
    setDoc(userRef, { emailVerified: true }, { merge: true });
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
