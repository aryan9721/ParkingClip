import "./QrRecord.css";
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

const QrRecord = () => {

 const [locations, setlocations] = useState([]);
    const [location, setlocation] = useState('no location found');
    const [businesss, setbusinesss] = useState([]);
    const [business, setbusiness] = useState('no business found');
const handlelocation = (event) => {
      const location = JSON.parse(event.target.value);
      // console.log('lox',location);
      setlocation(location);
      // setlocationData(location);
    };
  
    // useEffect(() => {
    //   getlocations();
    // }, [business]);
  
    // const getlocations = () => {
    //   axios.get(api + 'api/businesses/' + business.businessId).then((response) => {
    //     setlocations(response.data.data.locations);
    //     setlocation(response.data.data.locations[0].name);
    //   });
    // };


    const handlebusiness = (event) => {
      const business = JSON.parse(event.target.value);
      // console.log(business);
      setbusiness(business);
      console.log(business);
      setlocations(business.locations);
      if(business.location[0])
      setlocation(business.locations[0]);
      else
      setlocation("no location found");
    };
  
    useEffect(() => {
      getbusinesss();
    }, []);
  
    const getbusinesss = () => {
      axios.get(api + 'api/businesses').then((response) => {
        console.log(response.data.data.data);
        setbusinesss(response.data.data.data);
        setbusiness(response.data.data.data[0]);
        setlocations(response.data.data.data[0].locations);
        setlocation(response.data.data.data[0].locations[0]);
      });
    };
  const baseURL = api + "api/commons/vehicles/"+business.businessId+"?location="+location.name;

  const [results, setresults] = useState([]);

  useEffect(() => {
    getresults();
  }, [location]);
  
  //get todo list from database
  const getresults = () => {
    axios.get( api + "api/commons/vehicles/"+business.businessId+"?location="+location.name).then((response) => {
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
          label: "Print",
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
  // console.log(data);
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="VRbody">

        <div className="formInput" style={{ display: "flex", alignItems: "center" }}>
  <Typography variant="h5">QR Record for Business: </Typography>
  <select style={{marginLeft: 10, marginRight: 10}} id="businessselect" onChange={handlebusiness}>
    {/* <option value="">{locations[0].name}</option> */}
    {businesss.map((bus) => (
      <option value={JSON.stringify(bus)}>{bus.businessName}</option>
    ))}
  </select>
  <Typography variant="h5"> At Location: </Typography>
  <select style={{marginLeft: 10}} id="locationSelect" onChange={handlelocation}>
    {/* <option value="">{locations[0].name}</option> */}
    {locations.map((location) => (
      <option value={JSON.stringify(location)}>{location.name}</option>
    ))}
  </select>
</div>


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


export default QrRecord;
