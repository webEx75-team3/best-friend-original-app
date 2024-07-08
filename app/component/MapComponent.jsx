import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox,} from '@react-google-maps/api';

const libraries = ["places"];
const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const center = {
  lat: 35.6895, // 東京の緯度
  lng: 139.6917, // 東京の経度
};

const Map = () => {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const searchBox = useRef(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onPlacesChanged = () => {
    const places = searchBox.current.getPlaces();
    setPlaces(places);
    if (places.length > 0) {
      const place = places[0];
      const location = place.geometry.location;
      map.panTo(location);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBk34MJtHoEDYT7xu9SW4Jl4ctJZP9JZ-U" // ここにAPIキーを入力
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (searchBox.current = ref)}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search for places"
            style={{
              boxSizing: "border-box",
              border: "1px solid transparent",
              width: "240px",
              height: "32px",
              padding: "0 12px",
              borderRadius: "3px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              fontSize: "14px",
              outline: "none",
              textOverflow: "ellipses",
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </StandaloneSearchBox>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

