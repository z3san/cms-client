import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

// Create a context to hold the users data
const UsersContext = createContext();

const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://cms-server-navy.vercel.app/users"
        );
        if (response.status === 200) {
          const data = response.data;
          setUsers(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
  );
};

const useUsers = () => {
  const users = useContext(UsersContext);
  return users;
};

export { DataProvider, useUsers };
