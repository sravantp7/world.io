import { useLoaderData } from "react-router-dom";

export default function CountiesList() {
  const { cities } = useLoaderData();
  return <div>Countries</div>;
}
