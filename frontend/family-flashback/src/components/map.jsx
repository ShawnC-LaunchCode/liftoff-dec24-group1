import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JheXNvbmtlYXRvbiIsImEiOiJjbTFzMGs1NWUwMWJzMmtzanMxZGFvbHhuIn0.kwWA42Zk7_L4qPW7bby05g';

const Map = () => {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map', // ID of the div where the map will be rendered
            style: 'mapbox://styles/graysonkeaton/cm4c5alzt00q701rccelp32if', // Map style
            center: [-74.5, 40], // Starting position [lng, lat]
            zoom: 9 // Starting zoom level
        });

        return () => map.remove();
    }, []);

    return <div id="map" style={{ width: '100%', height: '400px' }} />; // Set the size of the map
};

export default Map;