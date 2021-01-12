import geohash from 'ngeohash';
import { geoDistances } from '../constants/location';

export function getModifier(type, distance, latitude) {
    const { latMilesPerDegree, lonMilesPerDegreeAtEquator } = geoDistances;

    if (type === 'lat') {
        return (1 / latMilesPerDegree) * distance;
    }

    const lonMilesPerDegree =
        Math.cos((latitude * Math.PI) / 180) * lonMilesPerDegreeAtEquator;

    return (1 / lonMilesPerDegree) * distance;
}

export function getRange(latitude, longitude, distance) {
    const latModifier = getModifier('lat', distance, latitude);
    const lonModifier = getModifier('lon', distance, null);

    const lowerLat = latitude - latModifier;
    const upperLat = latitude + latModifier;

    const lowerLon = longitude - lonModifier;
    const upperLon = longitude + lonModifier;

    return {
        lower: geohash.encode(lowerLat, lowerLon),
        upper: geohash.encode(upperLat, upperLon),
    };
}
