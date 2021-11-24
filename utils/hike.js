import {
    getFirestore,
    collection,
    query,
    where,
    doc,
    getDoc,
    getDocs,
    orderBy,
    limit,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { parseString } from 'xml2js';
import { getDistanceToHike } from '@utils/location';

const db = getFirestore();
const storage = getStorage();

global.XMLHttpRequest = require('xhr2');

export async function getHikeData(hid) {
    const hikeRef = doc(db, 'hikes', hid);
    const hikeSnapshot = await getDoc(hikeRef);

    return hikeSnapshot.data() || {};
}

export async function getHikeXmlUrl(hid) {
    const hikeXmlUrl = await getDownloadURL(ref(storage, `gpx/${hid}.gpx`));

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
    const q = query(collection(db, 'hikes'), orderBy('geohash'), limit(size));
    const querySnapshot = await getDocs(q);
    const hikes = await reduceHikes(querySnapshot);

    return hikes;
}

export function getNearbyHikesQuery(range) {
    return query(
        collection(db, 'hikes'),
        where('geohash', '>=', range.lower),
        where('geohash', '<=', range.upper),
        orderBy('geohash'),
        limit(20),
    );
}

export async function getNearbyHikes(size, range, currentCords) {
    const q = getNearbyHikesQuery(range);
    const querySnapshot = await getDocs(q);
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
    const q = query(collection(db, 'hikes'), where('featured', '==', true));
    const querySnapshot = await getDocs(q);
    const hikes = await reduceHikes(querySnapshot);

    return hikes;
}

export async function getHikeImageGallery(hid) {
    const galleryRef = doc(db, 'images', hid);
    const gallerySnapshot = await getDoc(galleryRef);
    const images = gallerySnapshot.data();
    const count = Object.keys(images).length;

    return { images, count };
}

export async function getMapImage(hid) {
    return getDownloadURL(ref(storage, `images/maps/light/${hid}.png`)).catch(
        () => null,
    );
}
