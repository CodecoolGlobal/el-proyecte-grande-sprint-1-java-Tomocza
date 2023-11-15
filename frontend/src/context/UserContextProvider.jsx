import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser, token, setToken}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserContextProvider;