import { useRef, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const INITIAL_BOUNDS = [[-126.386719,24.527135],[-66.093750,50.401515]];
const MAX_BOUNDS = [[-134,18], [-58,57]];
const MAX_ZOOM = 10;


export default function GustMap({ handleStationClick }) {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      bounds: INITIAL_BOUNDS,
      fitBoundsOptions: { padding: 15 },
      maxBounds: MAX_BOUNDS,
      maxZoom: MAX_ZOOM,
      pitchWithRotate: false,
      maxPitch: 0,
      projection: 'mercator'
    });

    mapRef.current.on('load', () => {
      mapRef.current.addSource('stations', {
        type: "geojson",
        data: "./stations.geojson"
      });

      mapRef.current.addLayer({
        id: 'circle',
        type: 'circle',
        source: 'stations',
        paint: {
          'circle-color': '#4264fb',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff'
        }
      });

      mapRef.current.on('click', 'circle', (e) => {
        mapRef.current.flyTo({
          center: e.features[0].geometry.coordinates,
          zoom: 7,
          duration: 2000
        });
        handleStationClick(e);
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      mapRef.current.on('mouseenter', 'circle', (e) => {
        mapRef.current.getCanvas().style.cursor = 'pointer';
        const { state, code, name, lng, lat } = e.features[0].properties;
        const htmlString = ReactDOMServer.renderToStaticMarkup(
          <div className='text-center'>
            <h2 className='font-bold text-xl'>{code}</h2>
            <p className='w-fit mx-auto mb-4 py-1.5 text-sm border-y-2 border-[#4264fb]'>{name}</p>
            <p className='text-lg mt-2'>{lat},{lng}</p>
            <p className='text-gray-600 italic text-sm'>({state})</p>
          </div>
        );
        popup
            .setLngLat(e.features[0].geometry.coordinates.slice())
            .setHTML(htmlString)
            .addTo(mapRef.current);
      });

      mapRef.current.on('mouseleave', 'circle', () => {
        mapRef.current.getCanvas().style.cursor = '';
        popup.remove();
      });

      
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  const handleButtonClick = () => {
    mapRef.current.fitBounds(INITIAL_BOUNDS, { padding: 15})
  }

  return (
    <div className='min-h-[400px] max-h-[800px] h-[75vh] relative'>
      <div className='w-full h-full bg-gray-100' ref={mapContainerRef}></div>

      <button className='bg-black text-white hover:bg-gray-800 hover:text-gray-200 hover:cursor-pointer absolute top-1.5 right-1.5 p-2 rounded font-bold' onClick={handleButtonClick}>
        Reset
      </button>
    </div>
  );
}