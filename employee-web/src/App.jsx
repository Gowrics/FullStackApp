import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import viteLogo from "/vite.svg";
import "./App.css";
import EmployeeManagement from "./EmployeeManagement";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <EmployeeManagement />
    </>
  );
}

export default App;
