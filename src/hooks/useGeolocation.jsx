import { useState } from "react";

export default function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get user current location using geolocation api of the browser.
  function getLocation() {
    if (!navigator.geolocation) return;

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // updating state with user current location
        setPosition({ lat, lng });
        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);
        console.log(err);
        window.alert(
          "Please allow location access to get your current location!"
        );
      }
    );
  }

  return { position, getLocation, isLoading };
}
