import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();

export async function maybeUpdatePassword(uid, password) {
    const updatePassword = httpsCallable(functions, 'updatePassword');

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
