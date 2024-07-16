import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker, InfoWindow } from '@react-google-maps/api';

const libraries = ["places"];
const mapContainerStyle = {
  height: '600px',
  width: '70%',
};

const center = {
  lat: 35.6895, // 東京の緯度
  lng: 139.6917, // 東京の経度
};

const MapWithSearchBox = () => {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markers, setMarkers] = useState([]);
  const searchBox = useRef(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onPlacesChanged = () => {
    const newPlaces = searchBox.current.getPlaces();
    setPlaces(newPlaces);
    if (newPlaces.length > 0) {
      const place = newPlaces[0];
      const location = place.geometry.location;
      map.panTo(location);
      const newMarker = {
        name: place.name,
        position: {
          lat: location.lat(),
          lng: location.lng(),
        },
      };
      setMarkers([...markers, newMarker]);
      setSelectedPlace(newMarker);
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedPlace(marker);
  };

  const handleMapClick = () => {
    setSelectedPlace(null);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBk34MJtHoEDYT7xu9SW4Jl4ctJZP9JZ-U"
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onClick={handleMapClick} // マップの空白部分をクリックしたときの処理を追加
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
              textOverflow: "ellipsis",
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </StandaloneSearchBox>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            onClick={() => handleMarkerClick(marker)}
          >
            {selectedPlace === marker && (
              <InfoWindow
                position={marker.position}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div>
                  <h4>{marker.name}</h4>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

const App = () => {
  return (
    <>
      <MapWithSearchBox />
    </>
  );
};

export default App;