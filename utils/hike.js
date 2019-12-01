import firebase from 'firebase';
import { parseString } from 'xml2js';

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

export async function parseHikeXml(hikeXmlUrl) {
    let hikeData = {};

    await fetch(hikeXmlUrl)
        .then((response) => response.text())
        .then((response) => {
            parseString(response, (err, result) => {
                hikeData = JSON.parse(JSON.stringify(result));
            });
        });

    return hikeData;
}

export default {
    getHikeData,
    getHikeXmlUrl,
};
