import axios from "axios";

// Function to set authorization header for Axios
const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Delete authorization header if there's no token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
