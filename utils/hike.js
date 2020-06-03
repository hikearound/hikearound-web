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
        .orderBy('createdOn', 'desc')
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

export async function getHikeImageGallery(id) {
    const gallerySnapshot = await firebase
        .firestore()
        .collection('images')
        .doc(id)
        .get();

    return gallerySnapshot.data();
}

export async function getHikeImage(id, index) {
    return firebase
        .storage()
        .ref(`hikes/${id}/images/${index}.jpg`)
        .getDownloadURL();
}

export async function getMapImage(id) {
    return firebase
        .storage()
        .ref(`images/maps/light/${id}.png`)
        .getDownloadURL();
}

export async function getHikeThumbnail(id, index) {
    return firebase
        .storage()
        .ref(`hikes/${id}/images/thumbnails/${index}_200x200.jpg`)
        .getDownloadURL();
}
