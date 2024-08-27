import { createContext, useContext, useState, useEffect } from "react";

// Creating a Context
const CitiesContext = createContext();

// Custom context provider
export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch cities information
    async function fetchCities() {
      try {
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities }}>
      {children}
    </CitiesContext.Provider>
  );
}

// custom hook for accessing context
export function useCities() {
  return useContext(CitiesContext);
}
