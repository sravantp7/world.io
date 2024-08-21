import styles from "./CityList.module.css";
import { useState, useEffect } from "react";

export default function CityList() {
  const [cities, setCities] = useState([]);

  // Convert date to given format
  function getDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  // Fetching cities list from json-server
  useEffect(() => {
    async function fetchCities() {
      const res = await fetch("http://localhost:8000/cities");
      const cities = await res.json();
      setCities(cities);
    }

    fetchCities();
  }, []);
  return (
    <ul className={styles.cityList}>
      {cities.length > 0 &&
        cities.map((city) => (
          <li key={city.id} className={styles.city}>
            <div>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </div>
            <div>
              <span>({getDate(new Date(city.date))})</span>
              <button>x</button>
            </div>
          </li>
        ))}
    </ul>
  );
}
