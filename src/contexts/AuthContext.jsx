import { createContext, useContext, useState } from "react";

// Fake authentication
const AuthContext = createContext();

// Fake user credential
const EMAIL = "admin@email.com";
const PASSWORD = "admin";

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Handle Login
  function handleLogin(email, password) {
    // Usually have an api call to verify the credentials

    // Simply checking with hardcoded values
    if (email === EMAIL && password === PASSWORD) {
      setLoggedIn(true);
      setUser({
        name: "Sam",
        avatar: "https://i.pravatar.cc/100?u=zz",
        email,
        password,
      });
    } else {
      console.log("Error");
      alert("Invalid Credentials");
    }
  }

  // Handle Logout
  function handleLogout() {
    setLoggedIn(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext used outside the AuthProvider!");
  }
  return context;
}
