import "./GenerateTicket.css";
import { useEffect, useState , useRef } from "react";
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import api from '../api';
// import Quagga from "quagga";
import { QrReader } from 'react-qr-reader';
import Webcam from 'react-webcam';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
} from '@mui/material';
const GenerateTicket = () => {
  var [date, setDate] = useState(new Date());
  const [resultData, setresultData] = useState("");
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  const [mobileNo, setMobileNo] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");
  const [vehicleRegistrationNo, setVehicleRegistrationNo] = useState("");
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [valletCharges, setvalletCharges] = useState(0);
  const [isValletApplicable, setisValletApplicable] = useState(false);

  const handlevalletCharges = (event) => {
    const valletCharges = event.target.value;
    setvalletCharges(valletCharges);
  };

  const handleisValletApplicable = (event) => {
    const isValletApplicable = event.target.value;
    setisValletApplicable(isValletApplicable);
  };


  const navigate = useNavigate();
  const handleVehicleRegistrationNo = (event) => {
    const vehicleRegistrationNo = event.target.value;
    setVehicleRegistrationNo(vehicleRegistrationNo);
  };

  const handleMobileNo = (event) => {
    const mobileNo = event.target.value;
    setMobileNo(mobileNo);
  };

  const handleVehicleType = (event) => {
    const vehicleType = event.target.value;
    setVehicleType(vehicleType);
  };
  function removeWhitespace(str) {
    return str.replace(/\s/g, "");
  }
  const localdata = JSON.parse(localStorage.getItem('userdata'));
  const submitUser = async (e) => {
    // console.log(localdata);
    e.preventDefault();
    const userdata = {
      attendantId: localdata.userId,
      vehicleType: vehicleType,
      mobileNo: mobileNo,
      vehicleRegistrationNo: removeWhitespace(vehicleRegistrationNo),
      isValletApplicable: isValletApplicable,
      valletNumber: valletCharges,
    };
    console.log("sending data: ", userdata);
    try{
      setMessage('');
      setErrorMsg('');
      await axios
      .post(
        api+ "api/parkings/vehicle/generateTicket",
        userdata
      )
      .then((result) => {
        console.log('response',result.data);

        setresultData(result.data);
        setMessage(result.data.message);
        // window.location.reload(false);

      });      
    }
    catch (error) {
      setErrorMsg(error.response.data.message);
      console.error("error",error.response.data.message);
  }

      setQrData('');
  };
    useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  const [isScanning, setIsScanning] = useState(false);
  // console.log(resultData);
  const handleScan = async (e) => {
    e.preventDefault();
    // console.log("scan",isScanning);
    setIsScanning(true);
  };

  const handleError = (err) => {
    console.error(err);
  };
  const [qrData, setQrData] = useState('');
  const handleScanResult =  (result) => {
    // console.log('qrdata: ', qrData);
    if(qrData=='' && result)
    {
        setQrData(JSON.parse(result));
        var data = JSON.parse(result);
        setMobileNo(data.mobileNo);
        setVehicleRegistrationNo(data.vehicleRegistrationNo);
        setVehicleType(data.vehicleType);
        setIsScanning(false);   
        // console.log('Name:', mobileNo, 'isScanning:', isScanning);
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
    console.log(capturedImage);
    setImage(capturedImage);
    setStream(null);
    handlePostImage(capturedImage);
  };

  const handlePostImage = async (image) => {
    // console.log(image);
    const imageFile = dataURLtoFile(image);
    // console.log(imageFile);
    const formData = new FormData();
    formData.append('file', imageFile);
    console.log(formData); console.log("hi"); 
    fetch('https://anpr-api.pushpak.cloud/api/v1/plate_number', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const dataOutput = data.plate_number
        if (dataOutput === "") {
            handleStartCamera();
            setImage(null);
            setErrorMsg("No LPN Detected, Please Retry again!!");
            console.log("No LPN Detected");
        } else {
            console.log(dataOutput);
            setImage(null);
            // setMessage("Read Sucessfull");
            // setErrorMsg('');
            setVehicleRegistrationNo(dataOutput);
        }
        // document.getElementById("uploadBtn").disabled = false;
    });
  };


  function dataURLtoFile(dataUrl) {
    const base64Data = dataUrl.split(',')[1];
    const fileType = dataUrl.split(';')[0].split('/')[1];
    const binaryData = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: `image/${fileType}` });
    const fileName = `image_${Date.now()}.${fileType}`;
    const file = new File([blob], fileName, { type: `image/${fileType}` });
    return file;
  }
  const [results, setresults] = useState([]);
  const [location, setlocation] = useState('no location found');

  useEffect(() => {
    getresults();
  }, []);
  //get todo list from database
  const getresults = () => {
    axios.get(api+'api/businesses/'+localdata.businessId).then((response) => {
      // console.log(response.data.data.locations);
      setresults(response.data.data.locations);
      setlocation(response.data.data.locations[0].name);
    });
  };

  const selectedLocationData = results.find((location1) => location1.name === localdata.location);
  // console.log(selectedLocationData);
  const vehicleTypes = selectedLocationData ? selectedLocationData.vehicleDetails.map((vehicle) => vehicle.type) : [];
  // console.log(vehicleTypes);
  const [torchMode, setTorchMode] = useState(false);
  const [open, setOpen] = useState(false);

  const printqr = async () => {
    console.log(resultData.data.vehicleRegistrationNo);
    axios.get(api+'api/commons/vehicles/qrcode/'+resultData.data.vehicleRegistrationNo)
    .then(response => {
      // console.log(response.data);
      printing(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    // try {

    //   const response = await fetch();
    //   console.log(response);
    // } catch (error) {
    //   console.error('Error fetching image data URL:', error);
    // }
  };
  function printing(data) {
    const printWindow = window.open();
    const img = new Image();
    img.onload = function() {
      printWindow.document.write(`<img src="${data}" />`);
      printWindow.print();
      printWindow.close();
    };
    img.src = data;
  }
  useEffect(() => {
    if (message !== '') {
      setOpen(true);
    }
  }, [message]);

  const handleClose = () => {
    setOpen(false);
    window.location.reload(); // Reload the page
  };
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="body">
          <div className="formContainer">
            <h3>Generate Parking Ticket</h3>
            <form>
            {/* {message!=='' && <Alert severity="success">{message}</Alert>} */}
            {errorMsg!=='' && <Alert severity="error">{errorMsg}</Alert>}

    {/* <div> */}
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Modal Title</DialogTitle> */}
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Generate Another ticket
          </Button>          
          
          <Button  onClick={() => printqr()} color="primary">
            Print  QR
          </Button>
        </DialogActions>
      </Dialog>
    {/* </div> */}
              <div className="formInput">
                <label>Parking Location</label>
                <input
                  disabled={true}
                  style={{ backgroundColor: "lightgrey", color: "#000000" }}
                  type="Text"
                  value={userdata.location}
                />
              </div>
              {/* <div style={{ width: "100%" }} className="formInput">
                <label>Ticket number</label>
                <input
                  disabled={true}
                  style={{ backgroundColor: "lightgrey", color: "#000000" }}
                  type="Text"
                  placeholder={"A123456"}
                />
              </div> */}
              
              <div className="formInput">
                <label>Entry date & time</label>
                <input
                  disabled={true}
                  style={{ backgroundColor: "lightgrey", color: "#000000" }}
                  type="Text"
                  value={date.toDateString() +" "+ date.toLocaleTimeString()}
                />
              </div>
              {/* <div className="formInput">
                <label>Entry time</label>
                <input
                  disabled={true}
                  style={{ backgroundColor: "lightgrey", color:"#000000"}}
                  type="Text"
                  value={date.toLocaleTimeString()}
                />
              </div> */}
              {/* <h6 style={{ width: "100%", marginTop: 0, marginBottom: 0}}>Details*</h6> */}
              <div style={{ width: "100%", float: 'left', flexDirection: "row"}}>
                <button style={{width: '47%'}} onClick={handleScan}>Scan QR Code</button>              
                {isScanning && (
                  <QrReader
                  delay={1000}
                  constraints={ {facingMode: 'environment'} }
                  onError={handleError}
                  onResult={handleScanResult}
                  style={{ width: '100%' }}
                />
                )}
                {stream === null ? (
                  <button style={{width: '47%', marginLeft: '5%'}} onClick={handleStartCamera}>Scan Number Plate</button>
                ) : (
                  <div>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                        videoConstraints={{
                        facingMode: "environment",
                        width: '80%',
                        torch: torchMode
                      }}
                      className="webcam"
                    />
                    <div>
                    {/* <button onClick={() => setTorchMode(!torchMode)}>Toggle Torch</button> */}
                    <button onClick={handleTakePicture}>Take picture</button>
                    </div>
                  </div>
                )}
                {/* {image !== null && (
                  <div>
                    <img src={image} alt="captured" />
                    <div>
                    <button onClick={handlePostImage}>Scan the image</button>
                    </div>
                  </div>                 
                )} */}
              </div>
              <div className="formInput">
                    <label>Select a vehicle type:</label>
                    <select id="vehicleTypeSelect" onChange={handleVehicleType}>
                      {/* <option value="">Select a vehicle type</option> */}
                      {vehicleTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {/* {selectedVehicleType && (
                      <p>You have selected: {selectedVehicleType}</p>
                    )} */}
                  </div>
              <div className="formInput">
                <label>Vehicle number</label>
                <input id="vehicleRegistrationNo"
                  value={vehicleRegistrationNo}
                  onChange={(e) => setVehicleRegistrationNo(e.target.value)}
                  type="Text"
                  // placeholder={"MH14PQ3603"}
                />
              </div>
              <div style={{ width: "100%" }} className="formInput">
                <label>Contact Number</label>
                <input
                required
                value={mobileNo}
                id="mobileNo"
                  onChange={(e) => setMobileNo(e.target.value)}
                  style={{
                    padding: "8px",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    height: "auto",
                  }}
                  type='tel'
                  // placeholder={"+91 1234567890"}
                />
              </div>
              {/* <FormControl style={{width: "48%"}}>
                <FormLabel id="demo-row-radio-buttons-group-label">Vallet Service?</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={false}
                >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl> */}

            
<FormControl style={{width: "48%"}}>
                <FormLabel id="demo-row-radio-buttons-group-label">Allow Vallet Services??</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => handleisValletApplicable(e)}
                    defaultValue="false"
                >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
            {isValletApplicable=="true"?(              <div className="formInput">
                <label>Vallet Number</label>
                <input required 
                  onChange={(e) => handlevalletCharges(e)}
                  type={Text}
                  // placeholder={"Rs. "}
                />
              </div>):(null)}

            {/* <FormControl style={{width: "48%"}}>
                <FormLabel id="demo-row-radio-buttons-group-label">Ticket Mode</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={false}
                >
                    <FormControlLabel value="true" control={<Radio />} label="Entry Basis" />
                    <FormControlLabel value="false" control={<Radio />} label="Rental Basis" />
                </RadioGroup>
            </FormControl> */}
            <div style={{alignItems: 'center', justifyContent: 'center', width: '100%', display: 'flex'}}>
            <button onClick={submitUser}>Generate a Ticket</button>
            </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default GenerateTicket;
