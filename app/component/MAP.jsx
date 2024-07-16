import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

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
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBk34MJtHoEDYT7xu9SW4Jl4ctJZP9JZ-U",
    libraries: libraries
  });

  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
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

      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach(marker => {
        bounds.extend(marker.position);
      });
      map.fitBounds(bounds);
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedPlace(marker);
  };

  const handleMapClick = () => {
    setSelectedPlace(null);
  };

  const handleLike = (marker) => {
    const markerId = `${marker.position.lat}-${marker.position.lng}`;
    setLikes((prevLikes) => ({
      ...prevLikes,
      [markerId]: (prevLikes[markerId] || 0) + 1,
    }));
  };

  const handleComment = (marker, comment) => {
    const markerId = `${marker.position.lat}-${marker.position.lng}`;
    setComments((prevComments) => ({
      ...prevComments,
      [markerId]: [...(prevComments[markerId] || []), comment],
    }));
  };

  // いいね数に応じてマーカーのアイコンを選択する関数
  const getMarkerIcon = (likesCount) => {
    if (likesCount >= 10000) {
      return 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,ffd600,ff000000&scale=2.0'; 
    } else if (likesCount >= 100) {
      return 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,e65100,ff000000&scale=2.0'; 
    } else if (likesCount >= 21) {
      return 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,0f9d58,ff000000&scale=2.0'; 
    } else if (likesCount >= 6) {
      return 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,1a237e,ff000000&scale=2.0';
    } else {
      return 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,e65100,ff000000&scale=2.0'; 
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onClick={handleMapClick}
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
          icon={{
            url: getMarkerIcon(likes[`${marker.position.lat}-${marker.position.lng}`] || 0),
            scaledSize: new window.google.maps.Size(40, 40) // マーカーのサイズを設定
          }}
          onClick={() => handleMarkerClick(marker)}
        >
          {selectedPlace === marker && (
            <InfoWindow
              position={marker.position}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <h4>{marker.name}</h4>
                <p>Likes: {likes[`${marker.position.lat}-${marker.position.lng}`] || 0}</p>
                <button onClick={() => handleLike(marker)}>いいね!</button>
                <textarea
                  rows={4}
                  cols={30}
                  placeholder="ここにレビューをどうぞ!"
                  defaultValue={comments[`${marker.position.lat}-${marker.position.lng}`] || ''}
                  onChange={(e) => {
                    const { value } = e.target;
                    handleComment(marker, value);
                  }}
                />
                <button onClick={() => handleComment(marker, comments[`${marker.position.lat}-${marker.position.lng}`])}>コメント欄</button>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ) : <></>;
};

const App = () => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBk34MJtHoEDYT7xu9SW4Jl4ctJZP9JZ-U"
      libraries={libraries}
    >
      <MapWithSearchBox />
    </LoadScript>
  );
};

export default App;






