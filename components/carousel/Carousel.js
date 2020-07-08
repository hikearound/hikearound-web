import dynamic from 'next/dynamic';

const Carousel = dynamic(() => import('@brainhubeu/react-carousel'), {
    ssr: false,
});

export default Carousel;
