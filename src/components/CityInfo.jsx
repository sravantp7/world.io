import { Link, useLoaderData, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";

import styles from "./CityInfo.module.css";

// Convert date to given format
function getDate(date) {
  const day = date.getDate();
  // Get full month name from date
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export default function CityInfo() {
  // Getting the cityId from the URL /cities/:cityId
  const { cityId } = useParams();
  // const { cities } = useLoaderData();
  const { cities } = useCities(); //Using context

  // Finding the city which matched with the cityId from the URL
  // const [currentCity] = cities.filter((city) => city.id == cityId);

  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // Reading current city value from the global context
  const { currentCity } = useCities();

  // const [city, setCity] = useState(null);

  // useEffect(() => {
  //   async function fetchCity() {
  //     const res = await fetch(`http://localhost:8000/cities`);
  //     const data = await res.json();
  //     console.log("Citites Datas are..");
  //     console.log(data);
  //   }

  //   fetchCity();
  // }, [cityId]);

  if (!currentCity) return;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    // Individual city information
    <div className={styles.cityInfo}>
      <div className={styles.header}>
        <p>cityname</p>
        <p>
          <span>{emoji}</span>
          {cityName}
        </p>
      </div>
      <div className={styles.header}>
        <p>you went to {cityName} on </p>
        <p>{getDate(new Date(date))}</p>
      </div>
      <div className={styles.header}>
        <p>your notes</p>
        <p>{notes}</p>
      </div>
      <div className={styles.btn}>
        <Link to={"/app/cities"}>
          <span>&larr;</span>
          <span>Back</span>
        </Link>
      </div>
    </div>
  );
}
