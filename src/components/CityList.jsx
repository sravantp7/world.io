import styles from "./CityList.module.css";
// import { useState, useEffect } from "react";
import { Outlet, useLoaderData, useParams, Link } from "react-router-dom";

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
  const { cities } = useLoaderData();

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

  // get cityId from the url /cities/:cityId
  const { cityId } = useParams();

  return (
    <ul className={styles.cityList}>
      {cities.length > 0 &&
        !cityId &&
        cities.map((city) => <CityItem key={city.id} city={city} />)}

      {/* Displays message when no cities present */}
      {cities.length === 0 && (
        <p className={styles.message}>
          Please add your first city by clicking on the map
        </p>
      )}
      {cityId && <Outlet />}
    </ul>
  );
}

function CityItem({ city }) {
  return (
    <li>
      <Link to={`${city.id}`} className={styles.city}>
        <div>
          <span>{city.emoji}</span>
          <span>{city.cityName}</span>
        </div>
        <div>
          <span>({getDate(new Date(city.date))})</span>
          <button>x</button>
        </div>
      </Link>
    </li>
  );
}
