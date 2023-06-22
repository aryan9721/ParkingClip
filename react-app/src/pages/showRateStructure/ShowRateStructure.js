import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from '../api';
// import HttpService from '../../utils/httpService'
import axios from "axios";
const ShowRateStructure = () => {
  const baseURL =
    api+ "api/businesses/rates/";

    const userdata = JSON.parse(localStorage.getItem('userdata'));
    // console.log(userdata);
    // const [post, setPost] = React.useState(null);

  // const [todo, setTodo] = useState("");

  //reading data from database
  const [results, setresults] = useState([]);

  useEffect(() => {
    getresults();
  }, []);
  //get todo list from database
  const getresults = () => {
    axios.get(baseURL+userdata.businessId).then((response) => {
      response.data.data.forEach(element => {
        element.isDayEndMidnight = element.isDayEndMidnight.toString();
        element.isValletApplicable = element.isValletApplicable.toString();
        element.maxCapping = element.maxCapping.toString();
      });
      setresults(response.data.data);
    });
  };
  // console.log("results.data", results.data);
  const data = {
    columns: [
      {
        label: "Business Id",
        field: "businessId",
      },
      {
        label: "location",
        field: "location",
        width: 150,
      },
      {
        label: "Vehicle Type",
        field: "vehicleType",
        width: 270,
      },
      {
        label: "Vallet Charges",
        field: "valletCharges",
        width: 200,
      },
      {
        label: "Rounding Up To",
        field: "roundingUpTo",
        width: 100,
      },
      {
        label: "Rent Per Hr",
        field: "rentPerHr",
        width: 150,
      },
      {
        label: "Minimum Charges",
        field: "minimumCharges",
        width: 100,
      },
      {
        label: "Max Capping?",
        field: "maxCapping",
        sort: "asc",
        width: 100,
      },
      {
        label: "Max Daily Rent",
        field: "maxDailyRent",
        sort: "asc",
        width: 100,
      },      {
        label: "Is Vallet Applicable",
        field: "isValletApplicable",
        sort: "asc",
        width: 100,
      },
      {
        label: "Is Day End Midnight",
        field: "isDayEndMidnight",
        sort: "asc",
        width: 100,
      },
    ],
    rows: results,
  };
  
  // console.log(data);
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="VRbody">
          <h3>Show Rate Structure</h3>
          {/* <h1>{results.data[0]}</h1> */}
          <MDBDataTable
            noBottomColumns style={{lineHeight: "normal",whiteSpace: "pre", justifyContent: "center"}} striped bordered small data={data} />
        </div>
      </div>
    </div>
  );
};

export default ShowRateStructure;
