import "./RegisterBusiness.css";
import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import api from '../api';
import {
  Alert,
} from '@mui/material';
const RegisterBusiness = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState('');

  const [resultData, setresultData] = useState("");
  const [businessName, setbusinessName] = useState("");
  const handlebusinessName = (event) => {
    const businessName = event.target.value;
    setbusinessName(businessName);
  };
  const [firstName, setfirstName] = useState("");
  const handlefirstName = (event) => {
    const firstName = event.target.value;
    setfirstName(firstName);
  };
  const [lastName, setlastName] = useState("");
  const handlelastName = (event) => {
    const lastName = event.target.value;
    setlastName(lastName);
  };
  const [middleName, setmiddleName] = useState("");
  const handlemiddleName = (event) => {
    const middleName = event.target.value;
    setmiddleName(middleName);
  };
  const [businessContactNo, setbusinessContactNo] = useState("");
  const handlebusinessContactNo = (event) => {
    const businessContactNo = event.target.value;
    setbusinessContactNo(businessContactNo);
  };
  const [personalContactNo, setpersonalContactNo] = useState("");
  const handlepersonalContactNo = (event) => {
    const personalContactNo = event.target.value;
    setpersonalContactNo(personalContactNo);
  };

  const [businessAddress, setbusinessAddress] = useState("");
  const handlebusinessAddress = (event) => {
    const businessAddress = event.target.value;
    setbusinessAddress(businessAddress);
  };
  const [personalAddress, setpersonalAddress] = useState("");
  const handlepersonalAddress = (event) => {
    const personalAddress = event.target.value;
    setpersonalAddress(personalAddress);
  };
  const [businessPincode, setbusinessPincode] = useState("");
  const handlebusinessPincode = (event) => {
    const businessPincode = event.target.value;
    setbusinessPincode(businessPincode);
  };
  const [personalPincode, setpersonalPincode] = useState("");
  const handlepersonalPincode = (event) => {
    const personalPincode = event.target.value;
    setpersonalPincode(personalPincode);
  };
  const [businessEmailId, setbusinessEmailId] = useState("");
  const handlebusinessEmailId = (event) => {
    const businessEmailId = event.target.value;
    setbusinessEmailId(businessEmailId);
  };
  const [personalEmailId, setpersonalEmailId] = useState("");
  const handlepersonalEmailId = (event) => {
    const personalEmailId = event.target.value;
    setpersonalEmailId(personalEmailId);
  };
  const [gstNo, setgstNo] = useState("");
  const handlegstNo = (event) => {
    const gstNo = event.target.value;
    setgstNo(gstNo);
  };
  const [pancardNo, setpancardNo] = useState("");
  const handlepancardNo = (event) => {
    const pancardNo = event.target.value;
    setpancardNo(pancardNo);
  };
  const submitUser = async (e) => {
    e.preventDefault();
    const userdata = {
      firstName: firstName,
      businessName: businessName,
      middleName: middleName,
      lastName: lastName,
      businessContactNo: businessContactNo,
      personalContactNo: personalContactNo,
      businessAddress: businessAddress,
      personalAddress: personalAddress,
      businessPincode: businessPincode,
      personalPincode: personalPincode,
      businessEmailId: businessEmailId,
      personalEmailId: personalEmailId,
      gstNo: gstNo,
      pancardNo: pancardNo,
    };
    // console.log("sending data: ", userdata);
    await axios
      .post(
        api+ "api/businesses",
        userdata
      )
      .then((result) => {
        // console.log(result.data);
        setresultData(result.data);
        setMessage(result.data.message);

      });
  };
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="body">
          <div className="formContainer">
            <h3>Create New Parking Business</h3>

            <form onSubmit={submitUser} >
            {message!=='' && <Alert severity="success">{message}</Alert>}
            <div onChange={(e) => handlebusinessName(e)}style={{ width: "100%" }} className="formInput">
                <label>Business Name*</label>
                <input required type={Text} placeholder={"ABC Services"} />
              </div>
              <div className="nameblock">
              <div onChange={(e) => handlefirstName(e)}style={{ width: "30%" }} className="formInput">
                <label>First Name*</label>
                <input required type={Text} placeholder={"Aryan"} />
              </div>
              <div onChange={(e) => handlemiddleName(e)}style={{ width: "30%" }} className="formInput">
                <label>Middle Name*</label>
                <input required type={Text} placeholder={"Mahendra"} />
              </div>
              <div onChange={(e) => handlelastName(e)} style={{ width: "30%" }} className="formInput">
                <label>Last Name*</label>
                <input required type={Text} placeholder={"Vora"} />
              </div>

              </div>
              <div onChange={(e) => handlebusinessContactNo(e)} className="formInput">
                <label>Business Contact No*</label>
                <input
                  style={{
                    padding: "8px",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    height: "auto",
                  }}
                  type="number"
                  placeholder={"+91 1234567890"}
                />
              </div>

              <div onChange={(e) => handlepersonalContactNo(e)} className="formInput">
                <label>Personal Contact No*</label>
                <input
                  style={{
                    padding: "8px",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    height: "auto",
                  }}
                  type="number"
                  placeholder={"+91 1234567890"}
                />
                              </div>

                <div onChange={(e) => handlebusinessAddress(e)} style={{ width: "100%" }} className="formInput">
                <label>Business Address*</label>
                <input required type={Text} placeholder={"Tilak road, Pune"} />
              </div>
              <div onChange={(e) => handlepersonalAddress(e)} style={{ width: "100%" }} className="formInput">
                <label>Personal Address*</label>
                <input required type={Text} placeholder={"411001"} />
              </div>
              <div onChange={(e) => handlebusinessPincode(e)} style={{ width: "100%" }} className="formInput">
                <label>Business Pincode*</label>
                <input required type="number" placeholder={"Tilak road, Pune"} />
              </div>
              <div onChange={(e) => handlepersonalPincode(e)} style={{ width: "100%" }} className="formInput">
                <label>Personal Pincode*</label>
                <input required type="number" placeholder={"411001"} />
              </div>              <div onChange={(e) => handlebusinessEmailId(e)} style={{ width: "100%" }} className="formInput">
                <label>Business EmailId*</label>
                <input required type="email" placeholder={"example@gmail.com"} />
              </div>
              <div onChange={(e) => handlepersonalEmailId(e)} style={{ width: "100%" }} className="formInput">
                <label>Personal EmailId*</label>
                <input required type="email" placeholder={"example@gmail.com"} />
              </div>              <div onChange={(e) => handlegstNo(e)} style={{ width: "100%" }} className="formInput">
                <label>GST Registration Number*</label>
                <input required type={Text} placeholder={"GST123456789"} />
              </div><div onChange={(e) => handlepancardNo(e)} style={{ width: "100%" }} className="formInput">
                <label>Pan Card Number*</label>
                <input required type={Text} placeholder={"AGV63NB42"} />
              </div>
              <button>Add Business</button>
            </form>
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

export default RegisterBusiness;
