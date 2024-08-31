import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// This component wraps our entire app and when not logged in we can't use any routes
export default function ProtectedRoute({ children }) {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // if not logged in then always navigate back to the homepage
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  // condictional rendering to fix displaying map ui when hitting the button multiple times
  // if not the app will try to render the cities and map ui in the app layout and after a small delay only the useEffect with the
  // navigation to homepage will happen. (because effect will run only after rendering)
  return loggedIn ? children : null;
}
