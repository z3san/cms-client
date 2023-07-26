import { useState, useEffect } from "react";
import { useUsers } from "../Provider/DataProvider";
import UserCard from "./UserCard";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import CsvDownloader from "./CsvDownloader";
import { FaDownload } from "react-icons/fa";

const UserDataDisplay = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dataFromContext = useUsers();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (dataFromContext.length > 0) {
      setUsers(dataFromContext);
      setIsLoading(false);
    }
  }, [dataFromContext]);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Validation for email
  const isEmailValid = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // Validation for phone number (allows only digits)
  const isPhoneValid = (value) => {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(value);
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

     if (!isEmailValid(email) || !isPhoneValid(phone)) {
       alert("Please enter valid email and phone number.");
       return;
     }


    const userData = {
      name: name,
      email: email,
      phone: phone,
    };

    try {
      const response = await axios.post(
        "https://cms-server-navy.vercel.app/create-user",
        userData
      );

      if (response.status === 200) {
        // Fetch the updated list of contacts from the server after creation
        const updatedUsersResponse = await axios.get(
          "https://cms-server-navy.vercel.app/users"
        );
        const updatedUsersData = updatedUsersResponse.data;

        // Update the state with the new list of users
        setUsers(updatedUsersData);

        // Reset the form values after successful creation
        setName("");
        setEmail("");
        setPhone("");

        setShowForm(false); // Close the form after creating contact
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `https://cms-server-navy.vercel.app/delete-user/${userId}`
      );

      if (response.status === 200) {
        // Update the state after a successful deletion
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Updating a user
  const handleUpdateUser = async (userId, updatedUserData) => {
    try {
      const response = await axios.put(
        `https://cms-server-navy.vercel.app/update-user/${userId}`,
        updatedUserData
      );

      if (response.status === 200) {
        // Update the state after a successful update
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, ...updatedUserData } : user
          )
        );
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchQuery.trim());
  };

  useEffect(() => {
    if (searchQuery === "") {
      setUsers(dataFromContext);
    } else {
      const filteredUsers = dataFromContext.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  }, [searchQuery, dataFromContext]);

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading....</p>
          <progress className="progress progress-success w-56 text-center" />
        </div>
      ) : users.length === 0 ? (
        <p>No data available</p>
      ) : (
        <>
          {showForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
              <div className="bg-white p-8 rounded shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Create User</h1>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border rounded-md px-2 py-1 mb-2 w-full"
                  />
                  <br />
                  <br />

                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border rounded-md px-2 py-1 mb-2 w-full"
                  />
                  <br />
                  <br />

                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border rounded-md px-2 py-1 mb-2 w-full"
                  />
                  <br />
                  <br />

                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 justify-center">
            <input
              type="text"
              className="input-sm"
              placeholder="Search By Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-sm" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div>
              <div
                className="bg-blue-500 flex text-sm gap-1 px-1 py-1 items-center hover:bg-blue-700 text-white rounded mt-4"
                onClick={handleShowForm}
              >
                <AiOutlinePlusCircle />
                Add User
              </div>
            </div>
            <div className="bg-red-300 flex text-sm gap-1 px-1 py-1 items-center hover:bg-blue-700 text-white rounded mt-4">
              <FaDownload />
              <CsvDownloader />
            </div>
          </div>

          <div className="flex flex-wrap">
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onDelete={handleDeleteUser}
                onUpdate={(userId, updatedUserData) =>
                  handleUpdateUser(userId, updatedUserData)
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDataDisplay;
