import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Date picker package
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

// Function for converting country code to emoji
function countryCodeToFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

export default function Form() {
  // reads data from the url query
  const [searchParams] = useSearchParams();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState(false);

  const { createNewCity, isLoading: isCreatingCity } = useCities();

  const navigate = useNavigate();

  // Gets the user clicked location's lat and lng value.
  const lat = +searchParams.get("lat");
  const lng = +searchParams.get("lng");

  // Function that handles the creation of new city by the user
  function handleCreateCity(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    // Creating new city object from the data [id will be automatically created by the json-server library].
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    // this function update isCreatingCity to true and once new city is created it will changed to false
    createNewCity(newCity);

    // and when isCreatinCity is false ie, created city then navigate back to /app/cities page
    if (!isCreatingCity) {
      // go back to cities page after adding new city
      navigate(`/app/cities?lat=${lat}&lng=${lng}`);
    }
  }

  useEffect(() => {
    if (!lat && !lng) return;
    // Fetch cities information using the lat and lng from another api
    // api -> https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en
    async function fetchCity() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );
        const data = await res.json();

        // If our selection is not a country then it will throw error
        // and displays error message instead of form in the ui
        if (!data.countryCode) {
          throw new Error("It is not a valid city, Please try again!");
        }

        // State updates [Batched]
        setError(false);
        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(countryCodeToFlagEmoji(data.countryCode));
      } catch (error) {
        setError(true);
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCity();
  }, [lat, lng]);

  // Prevent selecting future date as visited date
  useEffect(() => {
    const currentDate = new Date();
    if (date > currentDate) {
      setDate(new Date());
      alert("You can't select a future date.");
    }
  }, [date]);

  if (error) {
    return (
      <p className={styles.message}>It's not a valid city, Please try again!</p>
    );
  }

  if (isLoading) {
    return <p className={styles.message}>Loading city information ...</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleCreateCity}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          disabled
          value={`${emoji} ${cityName}`}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button className={styles.btn} disabled={isCreatingCity}>
          Add
        </button>
        <button
          className={`${styles.btn} ${styles.backBtn}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1); // go back functionality
          }}
        >
          &larr; Back
        </button>
      </div>
    </form>
  );
}
