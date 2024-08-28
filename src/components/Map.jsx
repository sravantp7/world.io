import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";

export default function Map() {
  // Here searchParams is of type URLSearchParams and contains function to access its values
  const [searchParams, setSearchParams] = useSearchParams();

  const { cities } = useCities();

  // State which is used to move map view when a city from the citylist is clicked
  const [mapPos, setMapPos] = useState([40, 0]);

  function updateMyLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;

      setMapPos([latitude, longitude]);
    });
  }

  // Update map position when we get lat and lng via seach params
  useEffect(() => {
    // if searchParams exists then size will be greater than 0
    if (searchParams.size > 0) {
      // getting selected city pos from the url and update the state
      setMapPos([+searchParams.get("lat"), +searchParams.get("lng")]);
    }
  }, [searchParams]);

  return (
    <MapContainer center={mapPos} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />

      {/* Rendering marker for each cities */}
      {cities.map(({ id, position, cityName, emoji }) => (
        <Marker position={[position.lat, position.lng]} key={id}>
          <Popup>
            <span>{emoji}</span>
            <span>{cityName}</span>
          </Popup>
        </Marker>
      ))}

      {/* Updating map view when the postion changes */}
      <ChangeMapView position={mapPos} />
      <DetectClick />
    </MapContainer>
  );
}

// Our own custom component for view updation
// Component resposible to changing map view when postion changes [react leaflet way of changing view as per doc]
function ChangeMapView({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

// Component that handles click event on the map
function DetectClick() {
  const navigate = useNavigate();

  // react leaflet hook for handling clicking in the map
  useMapEvent({
    click(e) {
      // Navigate to form when clicking on the map
      // along with lat and lng as url params
      navigate(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}
