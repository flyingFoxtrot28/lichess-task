import React, { useState } from "react";
import axios from "axios";

const Api = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://lichess.org/api/user/${username}`
      );
      setUserData(response.data);
      console.log(response.data);
      setError(null);
    } catch (error) {
      setError("User not found or API failure.");
      setUserData(null);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded p-8 shadow-md">
        <h1 className="text-4xl font-bold mb-4">Lichess User Profile Viewer</h1>
        <form onSubmit={handleSubmit} className="mb-4 flex">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2  hover:bg-blue-600"
          >
            Search
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {userData && (
          <div>
            <h2 className="text-xl font-bold mb-2">User Information</h2>
            <p>Username: {userData.username}</p>
            <p>Profile: {userData.url}</p>
            <p>Status: {userData.online ? "Online" : "Offline"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Api;
