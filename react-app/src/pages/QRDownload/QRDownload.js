import "./QRDownload.css";
import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api  from  '../api';
// import HttpService from '../../utils/httpService'
import axios from "axios";

import {
  // Avatar,
  // AvatarGroup,
  Box,
  Button,
  Grid,
  // List,
  // ListItemAvatar,
  // ListItemButton,
  // ListItemSecondaryAction,
  // ListItemText,
  // MenuItem,
  Stack,
  // TextField,
  Typography
} from '@mui/material';
function printing(row) {
  console.log('printing',row);
  const printWindow = window.open();
  const img = new Image();
  img.onload = function() {
    printWindow.document.write(`<img src="${row.qrCode}" />`);
    printWindow.print();
    printWindow.close();
  };
  img.src = row.qrCode;
}
const QRDownload = () => {
  const userdata = JSON.parse(localStorage.getItem('userdata'));
console.log(userdata);
  // const baseURL = api + "api/commons/vehicles/"+business.businessId+"?location="+location.name;
  const [results, setresults] = useState([]);

  useEffect(() => {
    getresults();
  }, []);
  
  //get todo list from database
  const getresults = () => {
    console.log(api + "api/commons/vehicles/"+userdata.businessId+"?location="+userdata.location);
    axios.get( api + "api/commons/vehicles/"+userdata.businessId+"?location="+userdata.location).then((response) => {
      console.log(response);
      setresults(response.data.data.data);
    });
  };

  const data = {
      columns: [
        {
          label: 'QR Code',
          field: 'qrCode'
        },
        {
          label: "Mobile No",
          field: "mobileNo",
        },
        {
          label: "Vehicle Number",
          field: "vehicleRegistrationNo",
          width: 150,
        },
        {
          label: "Vehicle Type",
          field: "vehicleType",
          width: 270,
        },
        {
          label: "Download",
          field: "actions",
          width: 50,
          sort: false,
        },
      ],
    rows: results && results.map((row) => ({ // Add a check before calling map
      qrCode: <img src={row.qrCode} alt=""></img>,
      mobileNo: row.mobileNo,
      vehicleRegistrationNo: row.vehicleRegistrationNo,
      vehicleType: row.vehicleType,
      actions: <button onClick={() => printing(row)}>Print</button> // Add a button to each row
    })),
  
  };
  // console.log(data);
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="VRbody">
          <h3>Registered Vehicles</h3>
          <MDBDataTable
            noBottomColumns
            style={{ lineHeight: "normal", whiteSpace: "pre", justifyContent: "center" }}
            striped
            bordered
            small
            data={data}
          />
        </div>
      </div>
    </div>
  );
};


export default QRDownload;
