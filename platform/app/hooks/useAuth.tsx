// hooks/useAuth.js
import { useEffect, useState } from "react";
import { auth } from "../../services/firebase.config"; // Adjust the path as necessary
import { onAuthStateChanged, User } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user state
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  return { user };
};
