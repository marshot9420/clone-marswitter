import { useState } from "react";
import AppRouter from "./Router";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn}></AppRouter>
    </div>
  );
};

export default App;
