import { useLoaderData, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function CityInfo() {
  // Getting the cityId from the URL /cities/:cityId
  const { cityId } = useParams();
  const { cities } = useLoaderData();

  // Finding the city which matched with the cityId from the URL
  const [targetCity] = cities.filter((city) => city.id == cityId);

  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div>
      <p>
        City Information {cityId} {targetCity.cityName}
        <span>
          lat: {lat}, lng: {lng}
        </span>
      </p>
    </div>
  );
}
