import styles from "./CityList.module.css";
// import { useState, useEffect } from "react";
import { Outlet, useLoaderData, useParams, Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

// Convert date to given format
function getDate(date) {
  const day = date.getDate();
  // Get full month name from date
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export default function CityList() {
  // Getting data from the loader function in the route
  //   const { cities } = useLoaderData();

  /* Using context to get the cities data */
  const { cities, isLoading } = useCities();

  //   const [cities, setCities] = useState([]);

  // Fetching cities list from json-server
  /*
  useEffect(() => {
    async function fetchCities() {
      const res = await fetch("http://localhost:8000/cities");
      const cities = await res.json();
      setCities(cities);
    }

    fetchCities();
  }, []); */

  // get cityId from the url params /cities/:cityId
  const { cityId } = useParams();

  return (
    <ul className={styles.cityList}>
      {cities.length > 0 &&
        !cityId &&
        !isLoading &&
        cities.map((city) => <CityItem key={city.id} city={city} />)}

      {/* Displays message when no cities present */}
      {cities.length === 0 && (
        <p className={styles.message}>
          Please add your first city by clicking on the map
        </p>
      )}
      {cityId && <Outlet />}

      {isLoading && <p className={styles.message}>Deleting City ...</p>}
    </ul>
  );
}

// Renders city list items
function CityItem({ city }) {
  const {
    position: { lat, lng },
  } = city;

  const { currentCity, setCurrentCity, deleteCity } = useCities();

  return (
    <li onClick={() => setCurrentCity(city)} className={styles.container}>
      <Link
        to={`${city.id}?lat=${lat}&lng=${lng}`}
        className={`${styles.city} ${
          currentCity.id == city.id ? `${styles.currentCity}` : ""
        }`}
      >
        <div>
          <span>{city.emoji}</span>
          <span>{city.cityName}</span>
        </div>
        <div>
          <span>({getDate(new Date(city.date))})</span>
        </div>
      </Link>
      <button onClick={() => deleteCity(city.id)}>x</button>
    </li>
  );
}
