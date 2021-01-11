import firebase from '@firebase/app';
import '@firebase/firestore';

export async function getUserProfileData(t, uid) {
    const userSnapshot = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .get();

    if (!userSnapshot.data()) {
        return {
            uid,
            name: t('user:deleted'),
        };
    }

    return userSnapshot.data();
}

export default getUserProfileData;
