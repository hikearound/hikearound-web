import { getAuth, signInWithCustomToken } from 'firebase/auth';

const auth = getAuth();

export async function signInUser(token) {
    let result;

    signInWithCustomToken(auth, token)
        .catch((error) => {
            result = error.toJSON();
        })
        .then((response) => {
            result = response.user.toJSON();
        });

    return result;
}

export default signInWithCustomToken;
