import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";

// Creating a Context
const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000/cities";

// Initial reducer state
const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
};

// Reducer function that manages state updates
function reducer(state, action) {
  switch (action.type) {
    case "cities/fetched":
      return {
        ...state,
        cities: action.payload,
      };
    case "cities/created":
      return {
        ...state,
        cities: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        cities: action.payload,
      };
    case "cities/loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "cities/currentCity":
      return {
        ...state,
        currentCity: action.payload,
      };
    default:
      throw new Error("Unknown action type!");
  }
}

// Custom context provider
export function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);

  // State stores the current clicked city
  /* const [currentCity, setCurrentCity] = useState({}); */

  // State for tracking new city creation
  /* const [isLoading, setIsLoading] = useState(false); */

  // state management
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, isLoading, currentCity } = state;

  // Runs after initial rendering
  useEffect(() => {
    // Fetch cities information
    async function fetchCities() {
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "cities/fetched", payload: data });
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchCities();
  }, []);

  // Function that creates new city object in the cities.json file
  async function createNewCity(newCity) {
    try {
      // setIsLoading(true);
      dispatch({ type: "cities/loading", payload: true });

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
      /* setCities((cities) => [...cities, new_city]);  */
      dispatch({ type: "cities/created", payload: [...cities, new_city] });
    } catch (error) {
      console.log(error.message);
    } finally {
      // setIsLoading(false);
      dispatch({ type: "cities/loading", payload: false });
    }
  }

  // Delete city
  async function deleteCity(cityId) {
    try {
      /* setIsLoading(true); */
      dispatch({ type: "cities/loading", payload: true });

      // request to json-server for deleting specific city from the cities.json file
      const res = await fetch(`${BASE_URL}/${cityId}`, {
        method: "DELETE",
      });
      await res.json();

      // Filtering cities state by removing the city with id cityId
      /* setCities((cities) => cities.filter((city) => city.id != cityId)); */
      const updatedCities = cities.filter((city) => city.id != cityId); // calculate new list of cities
      dispatch({ type: "cities/deleted", payload: updatedCities });
    } catch (error) {
      console.log(error.message);
    } finally {
      /* setIsLoading(false); */
      dispatch({ type: "cities/loading", payload: false });
    }
  }

  function setCurrentCity(city) {
    dispatch({ type: "cities/currentCity", payload: city });
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
