import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/storage';
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
        .ref(`gpx/${id}.gpx`)
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

export async function getRecentHikes(size) {
    const hikeRef = firebase
        .firestore()
        .collection('hikes')
        .orderBy('timestamp', 'desc')
        .limit(size);

    const querySnapshot = await hikeRef.get();
    const recentHikes = [];

    querySnapshot.forEach((hike) => {
        if (hike.exists) {
            const hikeData = hike.data() || {};
            hikeData.id = hike.id;
            const reduced = {
                key: hike.id,
                ...hikeData,
            };
            recentHikes.push(reduced);
        }
    });

    return recentHikes;
}

export async function getHikeImage(id, index) {
    return firebase
        .storage()
        .ref(`hikes/${id}/images/${index}.jpg`)
        .getDownloadURL();
}

export default {
    getHikeData,
    getHikeXmlUrl,
    parseHikeXml,
    getRecentHikes,
    getHikeImage,
};
