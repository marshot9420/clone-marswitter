import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
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
