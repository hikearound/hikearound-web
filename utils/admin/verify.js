import { initFirebaseAdmin } from '@utils/firebase/admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase-admin/firestore';

export async function checkUserExists(db, uid) {
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    return userSnapshot.data();
}

export async function updateUserRecord(db, uid) {
    getAuth().updateUser(uid, {
        emailVerified: true,
    });

    const userRef = doc(db, 'users', uid);
    setDoc(userRef, { emailVerified: true }, { merge: true });
}

export async function verify(uid) {
    initFirebaseAdmin();

    const db = getFirestore();
    const user = await checkUserExists(db, uid);

    if (user) {
        updateUserRecord(db, uid);
        return true;
    }

    return false;
}
