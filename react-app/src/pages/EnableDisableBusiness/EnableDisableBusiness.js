import "./EnableDisableBusiness.css";
import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api  from  '../api';
// import HttpService from '../../utils/httpService'
import axios from "axios";
import {
    Alert,
  } from '@mui/material';

const EnableDisableBusiness = () => {
  const baseURL = api + "api/commons/users/BUSINESS_OWNER";
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [results, setresults] = useState([]);

  useEffect(() => {
    getresults();
  }, []);
  
  //get todo list from database
  const getresults = () => {
    axios.get(baseURL).then((response) => {
        // console.log(response);
      setresults(response.data.data);
    });
  };

  const data = {
      columns: [
        {
          label: 'Business Name',
          field: 'name'
        },
        {
          label: "Contact Number",
          field: "mobileNo",
          width: 200,
        },
        {
          label: "Status",
          field: "isActive",
          width: 200,
        },
        {
          label: "Action",
          field: "action",
          width: 100,
        },
      ],
    rows: results && results.map((row) => ({ // Add a check before calling map
      name: row.name,
      mobileNo: row.mobileNo,
      isActive: row.isActive.toString(),
      action: row.isActive ? (
        <button onClick={() => handleDisbale(row)}>Disable</button>
      ) : (
        <button onClick={() => handleEnable(row)}>Enable</button>
      )    
    })),
  
  };
//   console.log(results)
function handleDisbale(row)
{
    // console.log('disable');
    axios.put(api+'api/commons/users/activateOrdeactivate/'+row.userId+'/'+'DISABLE').then((response) => {
        // console.log(response);
        getresults();
        setMessage(response.data.message);

    });
}

function handleEnable(row)
{
    // console.log('enable');
    axios.put(api+'api/commons/users/activateOrdeactivate/'+row.userId+'/'+'ENABLE').then((response) => {
        // console.log(response);
        getresults();
        setMessage(response.data.message);
    });
}
// console.log(message);
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="VRbody">

          {message!=='' && <Alert severity="success">{message}</Alert>}
            {errorMsg!=='' && <Alert severity="error">{errorMsg}</Alert>}

            <h3 style={{marginTop: 20}}>Enable Disable Business</h3>

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


export default EnableDisableBusiness;
