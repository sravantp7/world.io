import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

export default function Map() {
  // Here searchParams is of type URLSearchParams and contains function to access its values
  const [searchParams, setSearchParams] = useSearchParams();

  const [mapPos, setMapPos] = useState([40, 0]);

  function updateMyLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;

      // Updating URL params programatically
      setSearchParams({ lat: latitude, lng: longitude });
    });
  }

  const navigate = useNavigate();

  // Update map position when we get lat and lng via seach params
  useEffect(() => {
    // if searchParams exists then size will be greater than 0
    if (searchParams.size > 0) {
      setMapPos([searchParams.get("lat"), searchParams.get("lng")]);
    }
  }, [searchParams]);

  return (
    <MapContainer center={mapPos} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {/* <Marker position={mapPos}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
}
