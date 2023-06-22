import "./CreateAttendant.css";
import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import api from '../api/index';
import {
  Alert,
} from '@mui/material';
import Webcam from 'react-webcam';

const CreateAttendant = () => {
  // console.log(api);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [results, setresults] = useState([]);

  useEffect(() => {
    getresults();
  }, []);
  //get todo list from database
  const data = JSON.parse(localStorage.getItem('userdata'));

  const getresults = () => {
    axios.get(api+'api/businesses/'+data.userId).then((response) => {
      // console.log(response.data.data.locations);
      setresults(response.data.data.locations);
      setlocation(response.data.data.locations[0].name);
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [resultData, setresultData] = useState("");

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
  const [mobileNo, setmobileNo] = useState("");
  const handlemobileNo = (event) => {
    const mobileNo = event.target.value;
    setmobileNo(mobileNo);
  };
  const [aadharCardNo, setaadharCardNo] = useState("");
  const handleaadharCardNo = (event) => {
    const aadharCardNo = event.target.value;
    setaadharCardNo(aadharCardNo);
  };
  const [location, setlocation] = useState('no location found');
  const handlelocation = (event) => {
    const location = event.target.value;
    setlocation(location);
  };
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  // console.log(userdata.businessId);
  const submitUser = async (e) => {
    e.preventDefault();
    const localdata = JSON.parse(localStorage.getItem('userdata'));
    const userdata = {
      firstName: firstName,
      middleName: middleName ? middleName : "Not Defined",
      lastName: lastName ? lastName : "Not Defined",
      mobileNo: mobileNo,
      aadharCardNo: aadharCardNo,
      location: location,
      photoName: image,
      business: {
        businessId: localdata.businessId,
        businessName: localdata.userName,
      },
    };
    // console.log("sending data: ", userdata);
    try {
      await axios
      .post(
         api+ "api/attendants",
        userdata
      )
      .then((result) => {
        // console.log(result.data);
        setresultData(result.data);
        setErrorMsg("");
        setMessage(result.data.message);
      });      
    } catch (error) {
      console.log(error.response.data.message);
      setMessage('');
      setErrorMsg(error.response.data.message);
    }

  };
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const webcamRef = useRef(null);

  const handleStartCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    setStream(stream);
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const handleTakePicture = () => {
    // console.log(stream);
    const capturedImage = webcamRef.current.getScreenshot();
    // console.log(capturedImage);
    setImage(capturedImage);
    setStream(null);
    // console.log(capturedImage);
    // handlePostImage();
  };

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="body">
          <div className="formContainer">
            <h3>Create New Parking Attendant</h3>

            <form onSubmit={submitUser} >
            {message!=='' && <Alert severity="success">{message}</Alert>}
            {errorMsg!=='' && <Alert severity="error">{errorMsg}</Alert>}
              <div>
              {stream === null ? (
                  <button onClick={handleStartCamera}>{image===null? 'Take picture' : 'Retake'}</button>
                ) : (
                  <div>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                        videoConstraints={{
                        facingMode: "environment",
                        width: '60%',
                      }}
                      className="webcam"
                    />
                    <div>
                    {/* <button onClick={() => setTorchMode(!torchMode)}>Toggle Torch</button> */}
                    <button onClick={handleTakePicture}> Take picture</button>
                    </div>
                  </div>
                )}
                {image !== null && (
                  <div>
                    <img src={image} style={{height: '20%', width: '100%'}} alt="captured" />
                    <div>
                    {/* <button onClick={handlePostImage}>Scan the image</button> */}
                    </div>
                  </div>                 
                )}
              </div>
              <div onChange={(e) => handlefirstName(e)}style={{ width: "100%" }} className="formInput">
                <label>First Name*</label>
                <input required type={Text} placeholder={"ABC"} />
              </div>
              <div onChange={(e) => handlemiddleName(e)}style={{ width: "100%" }} className="formInput">
                <label>Middle Name</label>
                <input type={Text} placeholder={"ABC"} />
              </div>
              <div onChange={(e) => handlelastName(e)} style={{ width: "100%" }} className="formInput">
                <label>Last Name</label>
                <input type={Text} placeholder={"ABC"} />
              </div>
              <div onChange={(e) => handleaadharCardNo(e)} style={{ width: "100%" }} className="formInput">
                <label>Aaddhar Number</label>
                <input required type="number" placeholder={"1234 5678 9012"} />
              </div>
              <div onChange={(e) => handlemobileNo(e)} className="formInput">
                <label>Contact No*</label>
                <input required
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
              <div className="formInput">
                <label>Select Location</label>

                <select id="locationSelect" onChange={handlelocation}>
                {/* <option value="">{results[0].name}</option> */}
                {results.map((location) => (
                  <option value={location.name}>{location.name}</option>
                ))}
              </select>
                </div>
              {/* <div className="formInput">
                <label>Ticket mode*</label>
                <select>
                  <option>Normal</option>
                  <option>Valet</option>
                </select>
              </div> */}
              {/* <div className="formInput">
                <label>Job allocated*</label>
                <select>
                  <option>In-Gate</option>
                  <option>Out-Gate</option>
                </select>
              </div> */}
              {/* <div className="profileImg">
                <span className="addImgText">Add Image:</span>
                <input style={{display: "inline"}} type="file" onChange={handleChange} />
                <img style={{height: 150,width: 150, borderRadius: "50%"}} src={file} alt=""/>
              </div> */}
              <button>Add Attendant</button>
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

export default CreateAttendant;
