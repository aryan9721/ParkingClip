import "./ShowAttendant.css";
import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from '../api';
// import HttpService from '../../utils/httpService'
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const ShowAttendant = () => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (message !== '') {
      setOpen(true);
    }
  }, [message]);

  const handleClose = () => {
    setOpen(false);
    window.location.reload(); // Reload the page
  };

  const baseURL =
    api+ "api/attendants?page=0&limit=100";

    const [results, setresults] = useState([]);

    useEffect(() => {
      getresults();
    }, []);
    
    //get todo list from database
    const getresults = () => {
      axios.get(baseURL).then((response) => {
        setresults(response.data.data.data);
      });
    };
  // console.log("results.data", results.data);
  function handleButtonClick(row) {
    const updatedRow = {
      ...row,
      isOnDuty: !row.isOnDuty
    };
  
    axios.put(api+'api/attendants/'+updatedRow.attendantId, updatedRow)
      .then(response => {
        // handle success response
        setMessage(response.data.message);
        console.log('API call succeeded with response: ', response.data);
      })
      .catch(error => {
        // handle error response
        console.error('API call failed with error: ', error);
      });
  }

  function handleDeleteClick(row) {
    axios.delete(api+'api/attendants/'+row.attendantId)
      .then(response => {
        // handle success response
        setMessage(response.data.message);
        // console.log('API call succeeded with response: ', response.data);
      })
      .catch(error => {
        // handle error response
        console.error('API call failed with error: ', error);
      });
  }
  console.log(results);
  const data = {
    columns: [
      
      {
        label: "Picture",
        field: "photoName",
        width: 100,
      },
      {
        label: "First Name",
        field: "firstName",
      },
      {
        label: "middle Name",
        field: "middleName",
        width: 150,
      },
      {
        label: "last Name",
        field: "lastName",
        width: 270,
      },
      {
        label: "Contact Number",
        field: "mobileNo",
        width: 200,
      },
      {
        label: "Aadhar Card No",
        field: "aadharCardNo",
        width: 100,
      },
      {
        label: "location",
        field: "location",
        width: 150,
      },
      {
        label: "Active",
        field: "isOnDuty",
        // sort: "asc",
        width: 100,
      },
      {
        label: "Enable / Disable",
        field: "enabledisable",
        // sort: "asc",
        // width: 100,
      },
      {
        label: "Delete",
        field: "delete",
        // sort: "asc",
        // width: 100,
      },
    ],
    rows: results && results.map((row) => ({ // Add a check before calling map
      firstName: row.firstName,
      middleName: row.middleName,
      lastName: row.lastName,
      mobileNo: row.mobileNo,
      aadharCardNo: row.aadharCardNo,
      location: row.location,
      isOnDuty: row.isOnDuty.toString(),
      photoName: <img src={row.photoName} style={{height: 100, width: 125}} alt="" />,
      enabledisable: <button onClick={() => handleButtonClick(row)}>{row.isOnDuty ? 'Disable' : 'Enable'}</button>,
      delete: <button onClick={() => handleDeleteClick(row)}>Delete</button>
    })),
  };
  
  // console.log(data);
  return (
    <div className="home">
      <div className="homeContainer">
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Modal Title</DialogTitle> */}
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
        <div className="VRbody">
          <h3>Attendant Data</h3>
          {/* <h1>{results.data[0]}</h1> */}
          <MDBDataTable
            noBottomColumns style={{lineHeight: "normal",whiteSpace: "pre", justifyContent: "center"}} striped bordered small data={data} />
        </div>
      </div>
    </div>
  );
};

export default ShowAttendant;
