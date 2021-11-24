import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

export async function getUserProfileData(t, uid) {
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.data()) {
        return {
            uid,
            name: t('user:deleted'),
        };
    }

    return userSnapshot.data();
}

export default getUserProfileData;
