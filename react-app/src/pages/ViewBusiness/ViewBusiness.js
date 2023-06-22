import "./ViewBusiness.css";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import api from '../api';
import {
  Alert,
} from '@mui/material';
const ViewBusiness = () => {
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  const [results, setresults] = useState([]);

  useEffect(() => {
    getresults();
  }, []);
  //get todo list from database
  const getresults = () => {
    axios.get(api+'api/businesses/'+userdata.userId).then((response) => {
      console.log(response.data.data);
      setresults(response.data.data);
    });
  };
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="body">
          <div className="formContainer">
            <h3>Your Business</h3>
            {results?(            <form>
            {/* {message!=='' && <Alert severity="success">{message}</Alert>} */}
            <div style={{ width: "100%" }} className="formInput">
                <label>Business Name</label>
                <input required disabled={true}  value={results.businessName} type={Text} />
              </div>
              <div style={{ width: "100%" }} className="nameblock">
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

              </div>
              <div style={{ width: "100%" }} className="nameblock">

              <div style={{ width: "100%" }} className="formInput">
                <label>Business Contact No</label>
                <input
                disabled={true}
                value={results.businessContactNo}
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
                <label>Personal Contact No</label>
                <input

                disabled={true}
                value={results.personalContactNo}
                  style={{
                    padding: "8px",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    height: "auto",
                  }}
                  type="number"
                  
                />
                              </div>
                </div>
                <div style={{ width: "100%" }} className="formInput">
                <label>Business Address</label>
                <input required disabled={true}  value={results.businessAddress} type={Text} />
              </div>
              <div style={{ width: "100%" }} className="formInput">
                <label>Personal Address</label>
                <input required disabled={true}  value={results.personalAddress} type={Text} />
              </div>
              <div  style={{ width: "100%" }} className="formInput">
                <label>Business Pincode</label>
                <input required disabled={true}  value={results.businessPincode} type={Text} />
              </div>
              <div style={{ width: "100%" }} className="formInput">
                <label>Personal Pincode</label>
                <input required disabled={true}  value={results.personalPincode}  type={Text} />
              </div>              
              <div style={{ width: "100%" }} className="formInput">
                <label>Business EmailId</label>
                <input required disabled={true}  value={results.businessEmailId} type="email" />
              </div>
              <div style={{ width: "100%" }} className="formInput">
                <label>Personal EmailId</label>
                <input required disabled={true}  value={results.personalEmailId} type="email"  />
              </div>              <div style={{ width: "100%" }} className="formInput">
                <label>GST Registration Number</label>
                <input required disabled={true}  value={results.gstNo} type={Text} />
              </div><div style={{ width: "100%" }} className="formInput">
                <label>Pan Card Number</label>
                <input required disabled={true}  value={results.pancardNo} type={Text}  />
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

export default ViewBusiness;
