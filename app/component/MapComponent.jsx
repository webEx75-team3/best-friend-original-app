import React, { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

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
  const [markers, setMarkers] = useState([]);
  const searchBox = useRef(null);
  const [customIcon, setCustomIcon] = useState(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onPlacesChanged = () => {
    const places = searchBox.current.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      const location = place.geometry.location;
      const newMarker = { lat: location.lat(), lng: location.lng() };
      map.panTo(location);
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    }
  };

  useEffect(() => {
    if (isApiLoaded) {
      setCustomIcon({
        url: 'https://path-to-your-icon.png', // カスタムアイコンのURL
        scaledSize: new window.google.maps.Size(50, 50), // アイコンのサイズを調整
        origin: new window.google.maps.Point(0, 0), // アイコンの起点
        anchor: new window.google.maps.Point(25, 25), // アイコンのアンカー
      });
    }
  }, [isApiLoaded]);

  const handleApiLoad = () => {
    setIsApiLoaded(true);
  };

  const Marker = (options) => {
    const [marker, setMarker] = React.useState();
  
    React.useEffect(() => {
      if (!marker) {
        setMarker(new google.maps.Marker());
      }
  
      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);
    React.useEffect(() => {
      if (marker) {
        marker.setOptions(options);
      }
    }, [marker, options]);
    return null;
  };
  
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBk34MJtHoEDYT7xu9SW4Jl4ctJZP9JZ-U" // ここにAPIキーを入力
      libraries={libraries}
      onLoad={handleApiLoad}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onLoad={onMapLoad}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={customIcon}
          />
        ))}
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