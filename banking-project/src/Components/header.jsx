import React, { Component, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../Assets/logo.jpeg";

export default function Headerpage({ userDetails }) {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    if (userDetails.email) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [userDetails]);

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <a class="navbar-brand" href="#">
          <img src={logo} width="70px" />
          <span style={{ color: "white", marginLeft: "10px" }}>
            Touch Banks
          </span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        {loginStatus === false ? (
          ""
        ) : (
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link disabled" href="#">
                  Hi {userDetails.email}
                </a>
              </li>
              <li class="nav-item active">
                <Link
                  className="nav-link"
                  onClick={() => setLoginStatus(false)}
                  to="/"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
