import React, { useState, useEffect, useRef } from "react";
import { QrReader } from 'react-qr-reader';
import api from '../api';
import axios from "axios";
import './ExitVehicleByOCR.css';
import {
  Alert,
} from '@mui/material';
import Webcam from 'react-webcam';

const ExitVehicleByOCR = () => {
  const [isScanning, setIsScanning] = useState(true);
  const ticketURL = api + "api/parkings/vehicle/ticketByvehicle/";
  // const [results, setresults] = useState('');
  const [exitresult, setExitresult] = useState('');
  const [flag, setFlag] = useState(true);
  const handleScan = async (e) => {
    e.preventDefault();
    //   setFlag(true);
    //   console.log("scan",isScanning);
    setIsScanning(!isScanning);
  };
  // console.log('exit',exitresult);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message !== '') {
      setOpen(true);
    }
  }, [message]);

  const handleClose = () => {
    setOpen(false);
    window.location.reload(); // Reload the page
  };
  
  function exitvehicle() {
    console.log('exiting');
    const exitURL = api + "api/parkings/vehicle/ticketStatus/";
    axios.put(exitURL + results.ticketId + '/EXITED').then((response) => {
      console.log(response);
      setExitresult(response);

      //   results.entryDateTime = new Date(results.entryDateTime);
    });
  }
  const handleError = (err) => {
    console.error(err);
  };

  // const [qrData, setQrData] = useState('');
  const handleScanResult = (ticketId) => {
    console.log('got', ticketId);
    axios.get(ticketURL + ticketId).then((response) => {
      console.log(response);
      setresults(response.data.data);
      //   results.entryDateTime = new Date(results.entryDateTime);
    }).catch((error)=>{
      if(error.response.status===400)
      {
        alert('Vehicle not found, Invalid Vehicle number. Try Again')
      }
    });
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
    console.log('img',capturedImage);
    // setImage(capturedImage);
    setStream(null);
    handlePostImage(capturedImage);
  };

  const handlePostImage = async (image) => {
    console.log('exiting',image);
    const imageFile = dataURLtoFile(image);
    // console.log(imageFile);
    const formData = new FormData();
    formData.append('file', imageFile);
    // console.log(formData); console.log("hi"); 
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
          // setErrorMsg("No LPN Detected, Please Retry again!!");
          console.log("No LPN Detected");
        } else {
          console.log(dataOutput);
          setImage(null);
          handleScanResult(dataOutput);
          // setMessage("Read Sucessfull");
          // setErrorMsg('');
          // setVehicleRegistrationNo(dataOutput);
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
  const [results, setresults] = useState(null);
  const [torchMode, setTorchMode] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }
  // console.log(results);
  return (
    <div style={{ width: '100%' }}>
      {stream === null ? (
        <div>
        {results?(
            <div className='container'>
              <div className="ticket">
                {exitresult !== '' && <Alert severity="success">{exitresult.data.message}</Alert>}
                      {/* <div className='header'>
                  <img src={LOGO} alt="logo" width={147} height={56} />
                  <span className='headingText'>Parking Clip</span>
                </div> */}
                <div className='wrapper'>
                  <span style={{ fontSize: 30, linHeight: 39, marginBottom: 30 }}>
                    Ticket
                  </span>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 20 }}>{results.businessName}</span>
                    <span >Ticket No. </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <span>{results.parkingLocation}</span>
                    </div>
                    <span style={{ color: '#21BECC', fontWeight: '700' }}>{results.ticketId}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className='center' style={{ marginBottom: 16 }}>
                    <img src={results.qrCode} alt="logo" width={200} height={200} />
                  </div>
                </div>


                <div style={{ marginBottom: 16 }}>
                  <span className='entryText'>Entry Details</span>
                  {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{results.entryDateTime.getUTCDate()} / {results.entryDateTime.getUTCMonth()} / {results.entryDateTime.getUTCFullYear()}</span>
                  <span>{results.entryDateTime.getUTCHours()}:{results.entryDateTime.getUTCMinutes()} Hrs</span>
                </div> */}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{results.vehicleType} - {results.vehicleRegistrationNo}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Contact No - {results.mobileNo}</span>
                  </div>
                </div>
                <span className='entryText' style={{ marginBottom: 16 }}>Total Rent</span>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                  <div className='borderContainer' style={{ marginBottom: 16 }}>
                    <span style={{fontSize: 30}}> ₹  {results.ticketPaymentDetails.parkingCharges.totalRent}</span>
                  </div>
                </div>
                <span>Rent breakup</span>
                <div>
                  <div className='borderContainer' style={{ height: 135, marginTop: 10, marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <div className="details">
                      <span> Rent per Hour</span><span> {results.ticketPaymentDetails.parkingCharges.perHrRent} </span>
                    </div>
                    <div className="details">
                      <span> Vallet Charges </span><span>{results.ticketPaymentDetails.parkingCharges.valletCharges} </span>
                    </div>
                    <div className="details" style={{ border: 'none' }}>
                      <span> Total Time Hr </span><span>{results.ticketPaymentDetails.parkingCharges.totalTimeHr} </span>
                    </div>
                  </div>
                </div>
                {results.parkingStatus != "EXITED" ? (<div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                  <button onClick={exitvehicle}>Exit Vehicle</button>
                </div>) : (
                  <span>Parking Status: {results.parkingStatus}</span>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                  {/* <span style={{fontSize: 20}}> Contact us </span> */}
                </div>
                {/* <div style={{display: 'flex', justifyContent: 'center'}}>
                  <div style={{display: 'flex', width: 200,justifyContent: 'space-between'}}>
                  <img className='icons' height={23} width={23} src={forms} alt="forms" />
                  <img className='icons' height={23} width={23} src={facebookColor} alt="forms" />
                  <img className='icons' height={20} width={24} src={gmail} alt="forms" />
                  <img className='icons' height={27} width={27} src={whatsapp} alt="forms" />
                  </div>
                </div> */}
                <button onClick={refreshPage}>Scan Another</button>
              </div>
            </div>
        )
        // </div>
        :(
          <div style={{alignItems: 'center', justifyContent: 'center', width: '100%', display: 'flex', height: '100vh'}}>
          <button style={{width: '47%', marginLeft: '3%'}} onClick={handleStartCamera}>Scan Number Plate</button>
          </div>
      )}
      </div>

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
      {image !== null && (
        <div>
          <img src={image} alt="captured" />
          <div>
            <button onClick={handlePostImage}>Scan the image</button>
          </div>
          {/* <button onClick={handleDownload}>Download Image</button> */}
        </div>
      )}
    </div>
  )
}

export default ExitVehicleByOCR