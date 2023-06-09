import React, { Component, useState, useEffect } from "react";
import Newtransactionform from "./newtransactionform";
import SubmittedTransactions from "./submittedTransactions";
import { transactionDetails } from "../Assets/customerDetails";
import { useNavigate } from "react-router-dom";

export default function Accountdetailspage() {
  const [linkStatus, setLinkStatus] = useState("one");
  const [transactions, setTransactions] = useState(transactionDetails);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accountDetails")) {
      navigate("/");
    }
  }, []);

  const handleChange = (value) => {
    setLinkStatus(value);
  };

  const ChangeTransactionDetails = (value) => {
    setTransactions(value);
  };

  return (
    <div className=" text-center" style={{ height: "900px" }}>
      <div style={{ height: "900px" }}>
        <div className="row" style={{ height: "900px" }}>
          <div
            className="col-lg-2 mainContents"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <ul style={{ listStyle: "none", textAlign: "left" }}>
              <li>
                <div
                  style={{ marginTop: "10px" }}
                  onClick={(e) => handleChange("one")}
                >
                  <button type="button" class="btn btn-light">
                    New Transactions
                  </button>
                </div>
              </li>
              <li>
                <div
                  style={{ marginTop: "10px" }}
                  onClick={(e) => handleChange("two")}
                >
                  <button type="button" class="btn btn-light">
                    View Submitted Transactions
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-lg-10">
            {linkStatus === "one" ? (
              <Newtransactionform
                newTransactionDetails={(value) =>
                  ChangeTransactionDetails(value)
                }
              />
            ) : (
              <SubmittedTransactions transactions={transactions} />
            )}
          </div>
        </div>
      </div>

      {/* <main className="form-signin">{text}</main> */}
    </div>
  );
}
