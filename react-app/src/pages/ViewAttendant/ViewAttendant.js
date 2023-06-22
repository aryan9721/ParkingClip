import "./ViewAttendant.css";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import api from '../api';
import {
  Alert,
} from '@mui/material';
const ViewAttendant = () => {
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  const [results, setresults] = useState([]);

  useEffect(() => {
    getresults();
  }, []);
  //get todo list from database
  const getresults = () => {
    console.log(userdata);
    axios.get(api+'api/attendants/'+userdata.userId).then((response) => {
      console.log(response.data.data);
      setresults(response.data.data);
    });
  };
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="body">
          <div className="formContainer">
            <h3>Your Profile</h3>
            {results?(            <form>
            {/* {message!=='' && <Alert severity="success">{message}</Alert>} */}
              <div style={{ width: "100%" }} className="formInput">
                <label>First Name</label>
                <input required disabled={true}  value={results.firstName} type={Text}  />
              </div>
              <div style={{ width: "100%" }} className="formInput">
                <label>Middle Name</label>
                <input required disabled={true}  value={results.middleName} type={Text}  />
              </div>
              <div style={{ width: "100%" }} className="formInput">
                <label>Last Name</label>
                <input required disabled={true}  value={results.lastName} type={Text}  />
              </div>


              <div style={{ width: "100%" }} className="formInput">
                <label>Contact No</label>
                <input
                disabled={true}
                value={results.mobileNo}
                  style={{
                    padding: "8px",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    height: "auto",
                  }}
                  type="number"
                  
                />

          
                </div>
                <div style={{ width: "100%" }} className="formInput">
                <label>Location</label>
                <input required disabled={true}  value={results.location} type={Text}  />
              </div>
              {/* <button>Add Business</button> */}
            </form>):(null)}

          </div>
          {/* <Modal show={show} centered       size="md"
      aria-labelledby="contained-modal-title-vcenter" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{resultData['message']}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{resultData['message']}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
        </div>
      </div>
    </div>
  );
};

export default ViewAttendant;
