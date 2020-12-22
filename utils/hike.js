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

export async function reduceHikes(querySnapshot) {
    const hikes = [];

    querySnapshot.forEach((hike) => {
        if (hike.exists) {
            const hikeData = hike.data() || {};
            hikeData.id = hike.id;

            if (!hikeData.review) {
                hikeData.review = { average: 0, count: 0 };
            }

            const reduced = {
                key: hike.id,
                ...hikeData,
            };

            hikes.push(reduced);
        }
    });

    return hikes;
}

export async function getRecentHikes(size) {
    const hikeRef = firebase
        .firestore()
        .collection('hikes')
        .orderBy('createdOn', 'desc')
        .limit(size);

    const querySnapshot = await hikeRef.get();
    const hikes = await reduceHikes(querySnapshot);

    return hikes;
}

export async function getFeaturedHikes() {
    const hikeRef = firebase
        .firestore()
        .collection('hikes')
        .where('featured', '==', true);

    const querySnapshot = await hikeRef.get();
    const hikes = await reduceHikes(querySnapshot);

    return hikes;
}

export async function getHikeImageGallery(id) {
    const gallerySnapshot = await firebase
        .firestore()
        .collection('images')
        .doc(id)
        .get();

    const images = gallerySnapshot.data();
    const count = Object.keys(images).length;

    return { images, count };
}

export async function getMapImage(id) {
    return firebase
        .storage()
        .ref(`images/maps/light/${id}.png`)
        .getDownloadURL();
}
