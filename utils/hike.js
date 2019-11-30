import firebase from 'firebase';

global.XMLHttpRequest = require('xhr2');

export async function getHikeData(id) {
    const hikeSnapshot = await firebase
        .firestore()
        .collection('hikes')
        .doc(id)
        .get();

    const hikeData = hikeSnapshot.data() || {};
    return hikeData;
}

export async function getHikeXmlUrl(id) {
    const hikeXmlUrl = await firebase
        .storage()
        .ref(`hikes/${id}/hike.gpx`)
        .getDownloadURL();

    return hikeXmlUrl;
}

export default {
    getHikeData,
    getHikeXmlUrl,
};
