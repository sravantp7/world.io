import { createContext, useContext, useState, useEffect } from "react";

// Creating a Context
const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000/cities";

// Custom context provider
export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);

  // State stores the current clicked city
  const [currentCity, setCurrentCity] = useState({});

  // State for tracking new city creation
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch cities information
    async function fetchCities() {
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchCities();
  }, []);

  // Function that creates new city object in the cities.json file
  async function createNewCity(newCity) {
    try {
      setIsLoading(true);

      // Creating new city
      const res = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const new_city = await res.json();

      if (!new_city.id) {
        throw new Error("Failed to create new city item, Please try again!");
      }

      // Updating city state with new city.
      setCities((cities) => [...cities, new_city]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Delete city
  async function deleteCity(cityId) {
    try {
      setIsLoading(true);
      // request to json-server for deleting specific city from the cities.json file
      const res = await fetch(`${BASE_URL}/${cityId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();

      // Filtering cities state by removing the city with id cityId
      setCities((cities) => cities.filter((city) => city.id != cityId));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        setCurrentCity,
        createNewCity,
        isLoading,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// custom hook for accessing context
export function useCities() {
  return useContext(CitiesContext);
}
