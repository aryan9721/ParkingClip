import "./ShowLocations.css";
import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from '../api';
// import HttpService from '../../utils/httpService'
import axios from "axios";
const ShowLocations = () => {
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  const [results, setresults] = useState([]);

  useEffect(() => {
    getresults();
  }, []);
  //get todo list from database
  const getresults = () => {
    axios.get(api+'api/businesses/'+userdata.userId).then((response) => {
      // console.log(response.data.data.locations);
      setresults(response.data.data.locations);
    });
  };
  console.log(results);
  const data = {
    columns: [
      {
        label: "Location Name",
        field: "name",
      },
      {
        label: "Location Address",
        field: "address",
        width: 150,
      },
      {
        label: "GPS Co-ordinate of the location",
        field: "gpsCords",
        width: 270,
      },
      {
        label: "Type of location",
        field: "locationType",
        width: 200,
      },
      {
        label: " Vehicles Allowed and their capacity",
        field: "vehicleDetails",
        width: 100,
      },
    ],
    rows: results && results.map((row) => ({ // Add a check before calling map
      name: row.name,
      address: row.address,
      gpsCords: row.gpsCords,
      locationType: row.locationType,
      vehicleDetails: row.vehicleDetails && row.vehicleDetails.map((vehicle) => `${vehicle.type}: ${vehicle.capacity}`).join(', '),
    })),
  };
  
  // console.log('data:',data);
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="VRbody">
          <h3>Locations Registered</h3>
          {/* <h1>{results.data[0]}</h1> */}
          <MDBDataTable
            noBottomColumns style={{lineHeight: "normal",whiteSpace: "pre", justifyContent: "center"}} striped bordered small data={data} />
        </div>
      </div>
    </div>
  );
};

export default ShowLocations;
