import React, { Component, useState } from "react";
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Headerpage from "./header";
import Loginpage from "./loginPage";
import Mainpage from "./mainpage";
import Accountdetailspage from "./accountDetailspage";

export default function Routing() {
  const [loginDetails, setLoginDetails] = useState({});

  const userDetails = (value) => {
    if (value) {
      setLoginDetails(value);
    }
  };
  return (
    <BrowserRouter>
      <Headerpage userDetails={loginDetails}></Headerpage>
      <Routes>
        <Route
          path="/"
          element={<Mainpage onUserChange={(value) => userDetails(value)} />}
        />
        <Route path="/transaction" element={<Accountdetailspage />} />} />
        {/* <Route exact path="/chat" component={Chat} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/" component={ProductManagement} />
              <Route exact path="/analytics" component={Analytics} />
              <Route path="/adminPanel" component={adminPanel} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/iceCreams" component={Icecream} />
              <Route exact path="/selected" component={Selected} />
              <Route exact path="/desserts" component={Desserts} />
              <Route exact path="/coffee" component={Coffee} />
              <Route exact path="/menu" component={Menus} /> */}
      </Routes>
    </BrowserRouter>
  );
}
