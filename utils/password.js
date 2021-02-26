import firebase from '@firebase/app';
import '@firebase/functions';

export async function maybeUpdatePassword(uid, password) {
    const updatePassword = firebase.functions().httpsCallable('updatePassword');

    let status;

    await updatePassword({ uid, password })
        .then((result) => {
            status = result;
        })
        .catch((error) => {
            status = error;
        });

    return status;
}

export default maybeUpdatePassword;
