import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Map() {
  // Here searchParams is of type URLSearchParams and contains function to access its values
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  function updateMyLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;

      // Updating URL params programatically
      setSearchParams({ lat: latitude, lng: longitude });
    });
  }

  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <p>Lat: {lat}</p>
      <p>Lng: {lng}</p>
      <button onClick={updateMyLocation}>updateLocation</button>
    </div>
  );
}
