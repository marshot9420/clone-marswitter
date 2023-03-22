import { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; MarsWitter {new Date().getFullYear()}</footer>
    </div>
  );
};

export default App;
