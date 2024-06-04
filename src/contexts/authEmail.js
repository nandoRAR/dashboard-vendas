import { useState, createContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../services/firebase";

export const AuthEmailContext = createContext({});

export const AuthEmailProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser ? setUser(currentUser): setUser(null);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInEmail = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential;
      setErrorLogin(false);
      setUser(user);
    } catch (error) {
      setErrorLogin(true);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
    setUser(null);
    return <Navigate to="/login" />;
  };

  return (
    <AuthEmailContext.Provider
      value={{
        user,
        loading,
        signInEmail,
        logout,
        errorLogin
      }}
    >
      {children}
    </AuthEmailContext.Provider>
  );
};
