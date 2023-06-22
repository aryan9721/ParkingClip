import "./AddLocation.css";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import api from '../api';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import {
  Alert,
} from '@mui/material';

const AddLocation = () => {
  const [formValues, setFormValues] = useState([
    { name: 'Cycle', checked: false, capacity: '' },
    { name: 'Bike', checked: false, capacity: '' },
    { name: 'Car', checked: false, capacity: '' },
    { name: 'Auto Rikshaw', checked: false, capacity: '' },
    { name: 'Bus', checked: false, capacity: '' },
    { name: 'Tempo/LCV', checked: false, capacity: '' },
    { name: 'MCV', checked: false, capacity: '' },
    { name: 'Trailer', checked: false, capacity: '' },
    { name: 'Truck', checked: false, capacity: '' },
    { name: 'Other', checked: false, capacity: '' },
  ]);

  const [checkedValues, setCheckedValues] = useState([]);

  const handleChange = (event) => {
    const updatedFormValues = [...formValues];
    const index = updatedFormValues.findIndex((item) => item.name === event.target.name);
    updatedFormValues[index].checked = event.target.checked;
    setFormValues(updatedFormValues);

    if (event.target.checked) {
      setCheckedValues((prevValues) => [
        ...prevValues,
        { type: event.target.name, capacity: updatedFormValues[index].capacity },
      ]);
    } else {
      setCheckedValues((prevValues) =>
        prevValues.filter((item) => item.type !== event.target.name)
      );
    }
  };

  const handleCapacityChange = (event, name) => {
    const updatedFormValues = [...formValues];
    const index = updatedFormValues.findIndex((item) => item.name === name);
    updatedFormValues[index].capacity = event.target.value;
    setFormValues(updatedFormValues);

    const isChecked = updatedFormValues[index].checked;
    if (isChecked) {
      setCheckedValues((prevValues) => [
        ...prevValues.filter((item) => item.type !== name),
        { type: name, capacity: event.target.value },
      ]);
    }
  };



  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [resultData, setresultData] = useState("");

  const [name, setname] = useState("");
  const handlename = (event) => {
    const name = event.target.value;
    setname(name);
  };
  const [address, setaddress] = useState("");
  const handleaddress = (event) => {
    const address = event.target.value;
    setaddress(address);
  };
  const [locationType, setlocationType] = useState("");
  const handlelocationType = (event) => {
    const locationType = event.target.value;
    setlocationType(locationType);
  };
  const [mobileNo, setmobileNo] = useState("");
  const handlemobileNo = (event) => {
    const mobileNo = event.target.value;
    setmobileNo(mobileNo);
  };
  const [gpsCords, setgpsCords] = useState("");
  const handlegpsCords = (event) => {
    const gpsCords = event.target.value;
    setgpsCords(gpsCords);
  };
  const [location, setlocation] = useState("");
  const handlelocation = (event) => {
    const location = event.target.value;
    setlocation(location);
  };
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const [results, setresults] = useState([]);

    useEffect(() => {
      getresults();
    }, []);
    //get todo list from database
    const getresults = () => {
      axios.get(api+'api/businesses/'+userdata.userId).then((response) => {
        // console.log(response.data.data);
        setresults(response.data.data);
      });
    };
  const submitUser = async (e) => {
    e.preventDefault();
    const locations = {
      name: name,
      address: address,
      gpsCords: gpsCords,
      locationType: locationType,
      vehicleDetails: checkedValues,
    };
    
    if(results?(results.locations.push(locations)):(null));
    console.log(results);
    try {
      await axios
      .put(
        api+ "api/businesses/" + userdata.userId,
        results
      )
      .then((result) => {
        console.log(result.data);
        setresultData(result.data);
        setMessage(result.data.message);
      });
    } catch (error) {
        console.log(error.response.data.message);
        setErrorMsg(error.response.data.message);  
    }
  };
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="body">
          <div className="formContainer">
            <h3>Add New Parking Location</h3>
            {message!=='' && <Alert severity="success">{message}</Alert>}
            {errorMsg!=='' && <Alert severity="error">{errorMsg}</Alert>}
            <form onSubmit={submitUser} >
              <div onChange={(e) => handlename(e)}style={{ width: "100%" }} className="formInput">
                <label>Location Name*</label>
                <input type={Text} placeholder={"ABC"} />
              </div>
              <div onChange={(e) => handleaddress(e)} style={{ width: "100%" }} className="formInput">
                <label>Location Address*</label>
                <input type={Text} placeholder={"ABC"} />
              </div>
              <div onChange={(e) => handlegpsCords(e)} style={{ width: "100%" }} className="formInput">
                <label>GPS Co-ordinate of the location</label>
                <input type={Text} placeholder={"1234 5678 9012"} />
              </div>
              <div onChange={(e) => handlelocationType(e)}style={{ width: "100%" }} className="formInput">
                <label>Type of location</label>
                <input type={Text} placeholder={"ABC"} />
              </div>
              <div style={{display: 'inline', width: '100%'}}>
                <label>Select Vehicles Allowed and their capacity</label>
              {formValues.map((item) => (
        <div key={item.name} style={{ margin: '10px 0', display: 'flex'}}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={handleChange}
              name={item.name}
              style={{ marginRight: 10 }}
            />
            {item.name}
          </label>
          {item.checked && (
            <input
              type="text"
              required
              value={item.capacity}
              onChange={(event) => handleCapacityChange(event, item.name)}
              placeholder="Parking capacity"
              style={{ marginLeft: 10, width: '40%' }}
              pattern="[0-9]*"
            />
          )}
          
        </div>
      ))}
      </div>
              <button>Add Location</button>
            </form> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
