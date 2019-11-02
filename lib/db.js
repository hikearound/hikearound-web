import firebase from '@firebase/app';
import '@firebase/firestore';

function loadDB() {
    try {
        const config = {
            apiKey: 'AIzaSyDzhRGewrBXqU6XPG5Bdl29JpPRPNtdilY',
            authDomain: 'hikearound-14dad.firebaseapp.com',
            databaseURL: 'https://hikearound-14dad.firebaseio.com',
            projectId: 'hikearound-14dad',
            storageBucket: 'hikearound-14dad.appspot.com',
            messagingSenderId: '175063732296',
            appId: '1:175063732296:web:1f60ff2b03523972',
        };

        firebase.initializeApp(config);
    } catch (err) {
        if (!/already exists/.test(err.message)) {
            return firebase;
        }
    }
    return firebase;
}

export default loadDB;
