import React, { Component, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Mainpage from "./Components/mainpage";
import Headerpage from "./Components/header";
import Routing from "./Components/routing";

function App() {
  const [loginDetails, setLoginDetails] = useState({});

  const userDetails = (value) => {
    if (value) {
      setLoginDetails(value);
    }
  };

  return <Routing />;
}

export default App;
