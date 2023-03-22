import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<HomeScreen />} />
          </>
        ) : (
          <>
            <Route path="/" element={<AuthScreen />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
