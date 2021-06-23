import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/storage';
import { parseString } from 'xml2js';
import { getDistanceToHike } from '@utils/location';

global.XMLHttpRequest = require('xhr2');

export async function getHikeData(hid) {
    const hikeSnapshot = await firebase
        .firestore()
        .collection('hikes')
        .doc(hid)
        .get();

    const hikeData = hikeSnapshot.data() || {};
    return hikeData;
}

export async function getHikeXmlUrl(hid) {
    const hikeXmlUrl = await firebase
        .storage()
        .ref(`gpx/${hid}.gpx`)
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
            hikeData.hid = hike.id;

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

export async function getNearbyHikes(size, range, currentCords) {
    const hikeRef = firebase
        .firestore()
        .collection('hikes')
        .where('geohash', '>=', range.lower)
        .where('geohash', '<=', range.upper)
        .orderBy('geohash')
        .limit(20);

    const querySnapshot = await hikeRef.get();
    const hikes = await reduceHikes(querySnapshot);

    let reducedHikes = [];

    hikes.forEach((hike) => {
        if (hike) {
            const hikeCoords = hike.coordinates.center;
            const distanceToHike = getDistanceToHike(currentCords, hikeCoords);

            const reduced = {
                distanceToHike,
                ...hike,
            };

            if (distanceToHike !== 0) {
                reducedHikes.push(reduced);
            }
        }
    });

    reducedHikes = reducedHikes.sort(
        (a, b) => a.distanceToHike - b.distanceToHike,
    );

    reducedHikes = reducedHikes.slice(0, size);

    return reducedHikes;
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

export async function getHikeImageGallery(hid) {
    const gallerySnapshot = await firebase
        .firestore()
        .collection('images')
        .doc(hid)
        .get();

    const images = gallerySnapshot.data();
    const count = Object.keys(images).length;

    return { images, count };
}

export async function getMapImage(hid) {
    return firebase
        .storage()
        .ref(`images/maps/light/${hid}.png`)
        .getDownloadURL()
        .catch(() => null);
}
