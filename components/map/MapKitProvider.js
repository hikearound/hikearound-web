import dynamic from 'next/dynamic';

const MapkitProvider = dynamic(
    () => import('react-mapkit').then((mod) => mod.MapkitProvider),
    { ssr: false },
);

export default MapkitProvider;
