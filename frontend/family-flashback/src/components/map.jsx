import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JheXNvbmtlYXRvbiIsImEiOiJjbTFzMGs1NWUwMWJzMmtzanMxZGFvbHhuIn0.kwWA42Zk7_L4qPW7bby05g';

const Map = () => {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/graysonkeaton/cm4c5alzt00q701rccelp32if',
            center: [-95, 40],
            zoom: 4
        });

        return () => map.remove();
    }, []);

    return <div id="map" style={{ width: '100%', height: '800px' }} />;
};

export default Map;