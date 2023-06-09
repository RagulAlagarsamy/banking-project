import React, { Component, useState, useEffect } from "react";
import Loginpage from "./loginPage";
import "./login.css";

export default function Mainpage({ onUserChange }) {
  const [title, setTitle] = useState("hello");
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accountDetails")) {
      setLoginStatus(true);
    }
  }, [localStorage.getItem("accountDetails")]);

  const userDetails = (value) => {
    onUserChange(value);
  };
  return (
    <div style={{ height: "900px" }}>
      {""}
      <Loginpage onLoginUser={(value) => userDetails(value)}></Loginpage>
    </div>
  );
}
