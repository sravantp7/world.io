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
import useGeolocation from "../hooks/useGeolocation";

export default function Map() {
  // Here searchParams is of type URLSearchParams and contains function to access its values
  const [searchParams, setSearchParams] = useSearchParams();

  const { cities } = useCities();

  // State which is used to move map view when a city from the citylist is clicked
  const [mapPos, setMapPos] = useState([40, 0]);

  // custom hook to get the current location of the user
  const { position, isLoading, getLocation } = useGeolocation();

  // Fetching current location of the user
  function handleGetLocation() {
    getLocation();
  }

  // Update map position when we get lat and lng via seach params
  useEffect(() => {
    // if searchParams exists then size will be greater than 0
    if (searchParams.size > 0 && !position) {
      // getting selected city pos from the url and update the state
      setMapPos([+searchParams.get("lat"), +searchParams.get("lng")]);
    }

    if (position) {
      setMapPos([position.lat, position.lng]);
    }
  }, [searchParams, position]);

  // useEffect(() => {
  //   if (position) {
  //     setMapPos([position.lat, position.lng]);
  //   }
  // }, [position]);

  return (
    <>
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

        {/* Handles map click event */}
        <DetectClick />
        {!position && (
          <button
            className={styles.locBtn}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleGetLocation();
            }}
            disabled={isLoading}
          >
            {isLoading
              ? "Loading Current Location ..."
              : "Use Current Location"}
          </button>
        )}
      </MapContainer>
    </>
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
