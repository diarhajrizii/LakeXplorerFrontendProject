import React from "react";
import "./App.css";
import { userRoutes } from "./routes/Routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import setAuthToken from "./utils/checks/setAuthToken";

function App() {
  const token = localStorage.getItem("accessToken");
  setAuthToken(token);

  return (
    <>
      <Router>
        <Routes>
          {userRoutes.map((route, index) => (
            <Route
              path={route.path}
              element={<route.component />}
              key={index}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
