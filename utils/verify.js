import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/storage';

export async function verifyEmailAddress(uid, idToken) {
    firebase
        .firestore()
        .collection('auth')
        .doc(uid)
        .set({ idToken }, { merge: true });
}

export default { verifyEmailAddress };
