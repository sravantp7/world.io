import { useLoaderData } from "react-router-dom";
import styles from "./CountriesList.module.css";
import { useCities } from "../contexts/CitiesContext";

export default function CountiesList() {
  // Getting cities data here from the loader function in the route
  // const { cities } = useLoaderData();

  // using context for getting cities data
  const { cities } = useCities();

  const countries = [];

  // Filtering out country name from cities and removing duplicates
  cities.forEach((city) => {
    if (!countries.map((item) => item.country).includes(city.country)) {
      countries.push({ id: city.id, emoji: city.emoji, country: city.country });
    }
  });

  return (
    <ul className={styles.countriesList}>
      {countries.length > 0 &&
        countries.map((city) => (
          <li className={styles.countryCard} key={city.id}>
            <span className={styles.flag}>{city.emoji}</span>
            <span>{city.country}</span>
          </li>
        ))}
    </ul>
  );
}
