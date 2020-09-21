import firebase from '@firebase/app';
import '@firebase/auth';

export async function signInWithCustomToken(token) {
    let result;

    await firebase
        .auth()
        .signInWithCustomToken(token)
        .catch(function (error) {
            result = error.toJSON();
        })
        .then((response) => {
            result = response.user.toJSON();
        });

    return result;
}

export default signInWithCustomToken;
