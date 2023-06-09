import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Loginpage({ onLoginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {
      let details = {
        email: email,
        password: password,
      };
      localStorage.setItem("accountDetails", JSON.stringify(details));
      onLoginUser(details);
      navigate("/transaction");
    }
  }

  function validate() {
    let errors = {};
    let isValid = true;

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (typeof password !== "undefined") {
      if (password.length < 6) {
        isValid = false;
        errors["password"] = "Please add at least 6 digit password.";
      }
    }
    setErrors(errors);

    return isValid;
  }

  return (
    <div style={{ height: "100%" }}>
      <div className="mainContents text-center">
        <main className="form-signin">
          <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Sign in</h1>
            <div className="form-floating">
              <input
                type="email"
                style={{ width: "100%" }}
                className="form-control"
                name="email"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
              <div className="text-danger" style={{ textAlign: "left" }}>
                {errors.email}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                type="password"
                style={{ width: "100%" }}
                className="form-control"
                name="password"
                id="floatingPassword"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
              <div className="text-danger" style={{ textAlign: "left" }}>
                {errors.password}
              </div>
            </div>
            <br></br>
            <button className="w-100 btn btn-lg btn-danger" type="submit">
              Sign in
            </button>
          </form>
          <div style={{ marginTop: "15px" }}></div>
        </main>
      </div>
    </div>
  );
}
