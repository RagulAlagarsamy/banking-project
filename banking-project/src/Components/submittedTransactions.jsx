import React, { Component, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { transactionDetails } from "../Assets/customerDetails";
import "./submittedTransactions.css";

let oldtransactions = [];

export default function SubmittedTransactions({ transactions }) {
  const columns = [
    {
      field: "id",
      headerName: "Sno",
      width: 180,
    },
    {
      field: "customername",
      headerName: "Customer Name",
      width: 200,
    },
    {
      field: "customerphonenumeber",
      headerName: "Customer Phone Number",
      width: 250,
    },
    {
      field: "beneficiaryBank",
      headerName: "Beneficiary Bank",
      width: 280,
    },
    {
      field: "beneficiaryaccountnumber",
      headerName: "Beneficiary Account Number",
      width: 280,
    },
    {
      field: "transferamount",
      headerName: "Transferred Amount",
      width: 280,
    },
    {
      field: "paymentDetails",
      headerName: "Payment Details",
      width: 280,
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("lastTransactions")) {
      let lastTransactions = JSON.parse(
        localStorage.getItem("lastTransactions")
      );
      oldtransactions = [...lastTransactions];
    } else {
      oldtransactions = [...transactionDetails];
    }
  }, []);

  const rows = oldtransactions ? oldtransactions : transactionDetails;

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
            height: "800px",
          }}
        >
          {" "}
          <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={100}
            pageSize={5}
            style={{ fontSize: "15px" }}
          />
        </form>
      </main>
    </div>
  );
}
