import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
   
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const setAuth = (userObj, token) => {
    localStorage.setItem("token", token);
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateProfilePhoto = (photoUrl) => {
    const updatedUser = { ...user, profilePhoto: photoUrl };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setAuth,
        logout,
        updateProfilePhoto, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
