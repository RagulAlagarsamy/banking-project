import React, { Component, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select, { SelectChangeEvent } from "@material-ui/core/Select";
import { customerDetails } from "../Assets/customerDetails";
import { transactionDetails } from "../Assets/customerDetails";

export default function Newtransactionform({ newTransactionDetails }) {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    let temp = { ...input };
    temp[e.target.name] = e.target.value;
    setInput(temp);
  };

  const checkCustomerDetails = (e) => {
    customerDetails.map((customer) => {
      if (Number(input.customerNumber) === Number(customer.customerNumber)) {
        let temp = { ...input };
        temp.customername = customer.customername;
        temp.customeraddress = customer.customeraddress;
        temp.customerphonenumeber = customer.customerphonenumeber;
        setInput(temp);
        let errortemp = { ...errors };
        errortemp.customername = "";
        errortemp.customeraddress = "";
        errortemp.customerphonenumeber = "";
        errortemp.customerNumber = "";
        setErrors(errortemp);

        let elements = document.getElementsByClassName("MuiFormControl-root");
        for (let i = 0; i < elements.length; i++) {
          if (
            elements[i].innerHTML.includes("Customer Name") ||
            elements[i].innerHTML.includes("Customer Address") ||
            elements[i].innerHTML.includes("Customer Phone Number")
          ) {
            let innerTag = elements[i].getElementsByTagName("label");
            innerTag[0].classList.add("MuiInputLabel-shrink");
          }
        }
      }
    });
  };

  const validation = (e) => {
    let errors = {};
    let result = false;
    let regex = /^[a-zA-Z]+$/;

    if (!input.radio) {
      errors.radio = "Please select one option.";
      result = true;
    }
    if (!input.reference) {
      errors.reference = "Please enter reference number.";
      result = true;
    }

    if (!input.customerNumber) {
      errors.customerNumber = "Please enter Customer number.";
      result = true;
    }

    if (!input.customername) {
      errors.customername = "Please enter Customer Name.";
      result = true;
    }

    if (
      (!input.customeraddress &&
        input.region &&
        input.region !== "Port Louis") ||
      (!input.region && !input.customeraddress)
    ) {
      errors.customeraddress = "Please enter Customer Address.";
      result = true;
    }

    if (!input.customerphonenumeber) {
      errors.customerphonenumeber = "Please enter Customer Phone Number.";
      result = true;
    }

    if (!input.transferamount) {
      errors.transferamount = "Please enter Transfer Amount.";
      result = true;
    }

    if (!input.currency) {
      errors.currency = "Please select one Transfer Currency.";
      result = true;
    }

    if (!input.beneficiaryBank) {
      errors.beneficiaryBank = "Please enter Beneficiary Bank Name.";
      result = true;
    } else {
      if (!regex.test(input.beneficiaryBank)) {
        errors.beneficiaryBank = "Please enter Correct Beneficiary Bank Name.";
        result = true;
      }
    }

    if (!input.beneficiaryaccountnumber) {
      errors.beneficiaryaccountnumber =
        "Please enter Beneficiary Account Number.";
      result = true;
    }

    if (!input.paymentDetails) {
      errors.paymentDetails = "Please select one Payment Details.";
      result = true;
    }

    if (!input.region) {
      errors.region = "Please select one Region.";
      result = true;
    }

    setErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let transactions = [];
    if (!validation()) {
      if (localStorage.getItem("lastTransactions")) {
        let lastTransactions = JSON.parse(
          localStorage.getItem("lastTransactions")
        );
        transactions = [...lastTransactions];
      } else {
        transactions = [...transactionDetails];
      }

      let temp = input;
      temp.id = transactions.length;
      transactions.push(temp);
      newTransactionDetails(transactions);
      localStorage.setItem("lastTransactions", JSON.stringify(transactions));
      alert("Success");
      setInput({});
    }
  };

  return (
    <div className="text-center">
      <main
        className="form-details"
        style={{ marginLeft: "10px", marginTop: "30px", marginRight: "20px" }}
      >
        <form
          style={{
            padding: "30px",
            textAlign: "left",
            backgroundColor: "#f5f5f5",
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className="h3 mb-5 fw-normal">New Transactions</h1>

          <div className="mb-5 fw-normal">
            <input
              type="radio"
              checked={input.radio === "New" ? true : false}
              value="New"
              name="radio"
              style={{ marginRight: "10px" }}
              onChange={(e) => handleChange(e)}
            />
            <span style={{ marginRight: "10px" }}>New</span>
            <input
              type="radio"
              checked={input.radio === "Existing" ? true : false}
              value="Existing"
              name="radio"
              style={{ marginRight: "10px" }}
              onChange={(e) => handleChange(e)}
            />
            <span style={{ marginRight: "10px" }}>Existing</span>
            <div className="text-danger">{errors.radio}</div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              {/* <label className="mb-2">First Name</label> */}
              <TextField
                id="standard-basic"
                className="form-control"
                name="reference"
                label="Reference"
                value={input.reference}
                onChange={(e) => handleChange(e)}
              />
              <div className="text-danger">{errors.reference}</div>
            </div>
            <div className="col-lg-6">
              {/* <label className="mb-2">Last Name</label> */}
              <TextField
                id="standard-basic"
                className="form-control"
                name="customerNumber"
                label="Customer Number"
                value={input.customerNumber}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => checkCustomerDetails(e)}
              />
              <div className="text-danger">{errors.customerNumber}</div>
            </div>
          </div>
          <br></br>
          <div className="row" style={{ textAlign: "left" }}>
            <div className="col-lg-6">
              <TextField
                id="standard-basic"
                className="form-control"
                name="customername"
                label="Customer Name"
                value={input.customername}
                onChange={(e) => handleChange(e)}
              />
              <div className="text-danger">{errors.customername}</div>
            </div>
            <div className="col-lg-6">
              <TextField
                id="standard-basic"
                className="form-control"
                name="customeraddress"
                label="Customer Address"
                disabled={input.region === "Port Louis" ? true : false}
                value={input.customeraddress}
                onChange={(e) => handleChange(e)}
              />
              <div className="text-danger">{errors.customeraddress}</div>
            </div>
          </div>
          <br></br>
          <div className="row" style={{ textAlign: "left" }}>
            <div className="col-lg-6">
              <TextField
                id="standard-basic"
                type="number"
                className="form-control"
                name="customerphonenumeber"
                label="Customer Phone Number"
                value={input.customerphonenumeber}
                onChange={(e) => handleChange(e)}
              />
              <div className="text-danger">{errors.customerphonenumeber}</div>
            </div>
            <div className="col-lg-6">
              <TextField
                id="standard-basic"
                type="number"
                className="form-control"
                name="transferamount"
                label="Transfer Amount"
                value={input.transferamount}
                onChange={(e) => handleChange(e)}
              />
              <div className="text-danger">{errors.transferamount}</div>
            </div>
          </div>
          <br></br>
          <div className="row" style={{ textAlign: "left" }}>
            <div className="col-lg-6">
              <FormControl style={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">
                  Transfer Currency
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={input.currency}
                  label="Currency Details"
                  name="currency"
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={"AED"}> AED</MenuItem>
                  <MenuItem value={"EUR"}> EUR</MenuItem>
                  <MenuItem value={"CHF"}> CHF</MenuItem>
                  <MenuItem value={"USD"}> USD</MenuItem>
                </Select>
              </FormControl>
              <div className="text-danger">{errors.currency}</div>
            </div>
          </div>
          <br></br>
          <h1 className="h5 mb-3 fw-normal">Beneficiary Details</h1>
          <div className="row" style={{ textAlign: "left" }}>
            <div className="col-lg-6">
              <TextField
                id="standard-basic"
                className="form-control"
                name="beneficiaryBank"
                label="Beneficiary Bank"
                value={input.beneficiaryBank}
                onChange={(e) => handleChange(e)}
              />
              <div className="text-danger">{errors.beneficiaryBank}</div>
            </div>
            <div className="col-lg-6">
              <TextField
                id="standard-basic"
                className="form-control"
                name="beneficiaryaccountnumber"
                label="Beneficiary Account Number"
                value={input.beneficiaryaccountnumber}
                onChange={(e) => handleChange(e)}
              />
              <div className="text-danger">
                {errors.beneficiaryaccountnumber}
              </div>
            </div>
          </div>
          <br></br>
          <div className="row" style={{ textAlign: "left" }}>
            <div className="col-lg-6">
              <FormControl style={{ width: "34%" }}>
                <InputLabel id="demo-simple-select-label">
                  Payment Details
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={input.paymentDetails}
                  label="Payment Details"
                  name="paymentDetails"
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={"Credit Card"}> Credit Card</MenuItem>
                  <MenuItem value={"Debit Card"}> Debit Card</MenuItem>
                </Select>
              </FormControl>
              <div className="text-danger">{errors.paymentDetails}</div>
            </div>
            <div className="col-lg-6">
              <FormControl style={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">Region</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={input.region}
                  label="Select Region"
                  name="region"
                  onChange={(e) => {
                    handleChange(e);
                    if (e.target.value === "Port Louis") {
                      let temp = { ...errors };
                      temp.customeraddress = "";
                      setErrors(temp);
                    }
                  }}
                >
                  <MenuItem value={"Port Louis"}> Port Louis</MenuItem>
                  <MenuItem value={"Curepipe"}> Curepipe</MenuItem>
                  <MenuItem value={"Vacoas"}> Vacoas</MenuItem>
                  <MenuItem value={"Port Mathurin"}> Port Mathurin</MenuItem>
                </Select>
              </FormControl>
              <div className="text-danger">{errors.region}</div>
            </div>
          </div>
          <br></br>
          {/* <button className="w-40 btn btn-danger" type="submit">Submit</button> */}
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </main>
    </div>
  );
}
