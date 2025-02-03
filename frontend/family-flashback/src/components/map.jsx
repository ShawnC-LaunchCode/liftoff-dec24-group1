import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JheXNvbmtlYXRvbiIsImEiOiJjbTFzMGs1NWUwMWJzMmtzanMxZGFvbHhuIn0.kwWA42Zk7_L4qPW7bby05g';

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [locations, setLocations] = useState([]);

    // Fetch locations from the API
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('http://localhost:8080/persons/locations', {
                    credentials: 'include'
                });
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        fetchLocations();
    }, []);

    // Initialize map and add markers
    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/graysonkeaton/cm4c5alzt00q701rccelp32if',
            center: [-98.5795, 39.8283], // Center of the US (approximately Kansas)
            zoom: 3.5 // Zoom level to show entire US
        });

        map.current.on('load', async () => {
            for (const location of locations) {
                try {
                    const response = await fetch(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`
                    );
                    const data = await response.json();
                    
                    if (data.features && data.features.length > 0) {
                        const [lng, lat] = data.features[0].center;
                        
                        const marker = new mapboxgl.Marker({
                            color: '#FF0000',
                            scale: 0.8 // Smaller marker size
                        })
                            .setLngLat([lng, lat])
                            .setPopup(
                                new mapboxgl.Popup({ offset: 25 })
                                    .setHTML(`<h3>${location}</h3>`)
                            );
                        
                        marker.addTo(map.current);
                    }
                } catch (error) {
                    console.error(`Error geocoding ${location}:`, error);
                }
            }
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [locations]);

    return <div ref={mapContainer} style={{ width: '100%', height: '800px' }} />;
};

export default Map;