import { useLoaderData, useParams } from "react-router-dom";

export default function CityInfo() {
  const { cityId } = useParams();
  const { cities } = useLoaderData();

  // Finding the city which matched with the cityId from the URL
  const [targetCity] = cities.filter((city) => city.id == cityId);

  return (
    <div>
      <p>
        City Information {cityId} {targetCity.cityName}
      </p>
    </div>
  );
}
