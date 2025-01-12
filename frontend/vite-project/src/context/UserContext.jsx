import React, { createContext, useState } from "react";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });
  const [vehicleType, setVehicleType] = useState(null);

  return (
    <>
      <userDataContext.Provider
        value={{ user, setUser, vehicleType, setVehicleType }}
      >
        {children}
      </userDataContext.Provider>
    </>
  );
}

export default UserContext;
