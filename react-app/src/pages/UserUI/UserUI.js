import './UserUI.css';
import LOGO from '../../assets/Logo.png';
import Location from '../../assets/location.png';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Facebook from '../../assets/Facebook.png';
import Twitter from '../../assets/Twitter.png';
import Insta from '../../assets/Instagram.png';
import forms from '../../assets/forms.png';
import facebookColor from '../../assets/FacebookColor.png';
import gmail from '../../assets/gmail.png';
import whatsapp from '../../assets/Whatsapp.png';
import api from '../api';
import Webcam from 'react-webcam';

function UserUI() {
  const [TicketId, setTicketId] = useState(null);

  useEffect(() => {
    const TicketId = window.location.hash.replace(/^#\/UserUI\?TicketId=/, '');
    setTicketId(TicketId);
  }, []);

  const baseURL = api + "api/commons/user/ticket/";
  const [results, setresults] = useState(null);
  useEffect(() => {
    getresults();
  }, []);

  const getresults = () => {
    const TicketId = window.location.hash.replace(/^#\/UserUI\?TicketId=/, '');
    axios.get(baseURL + TicketId).then((response) => {
      // console.log(baseURL+TicketId);
      var data = response.data.data;
      data.entryDateTime = new Date(data.entryDateTime);
      data.exitDateTime = new Date(data.exitDateTime);
      setresults(data);
    });
  };
  const [location, setLocation] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState('');

  useEffect(() => {
    const storedLocationData = JSON.parse(localStorage.getItem('locationData'));
    if (storedLocationData && storedLocationData.TicketId == TicketId) {
      const latitude = storedLocationData.latitude;
      const longitude = storedLocationData.longitude;
      setLocation({ latitude, longitude });
    }

    const storedAdditionalInfo = JSON.parse(localStorage.getItem('additionalInfo'));
    if (storedAdditionalInfo && storedAdditionalInfo.TicketId == TicketId) {
      // console.log(storedAdditionalInfo.additionalInfo);
      setAdditionalInfo(storedAdditionalInfo.additionalInfo);
    }

    const storedImageData = JSON.parse(localStorage.getItem('imageData'));
    // console.log(storedImageData);
    if (storedImageData && storedImageData.TicketId == TicketId) {
      setImage(storedImageData.capturedImage);
    }
  }, [TicketId]);

  // console.log(TicketId);
  const handleCaptureLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationData = { latitude, longitude, TicketId };
        localStorage.setItem('locationData', JSON.stringify(locationData));
        setLocation(locationData);

      },
      (error) => {
        console.error(error);
      }
    );
  };

  const handleNavigateToLocation = () => {
    const { latitude, longitude } = location;
    window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
  };

  const handleAdditionalInfoChange = (event) => {
    setAdditionalInfo(event.target.value);
  };

  const handleSaveAdditionalInfo = () => {
    const additionalInfo1 = { additionalInfo, TicketId };
    localStorage.setItem('additionalInfo', JSON.stringify(additionalInfo1));
    alert('Additional information saved!');
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
  console.log(results);
  const handleTakePicture = () => {
    // console.log(stream);
    const capturedImage = webcamRef.current.getScreenshot();
    // console.log(capturedImage);
    setImage(capturedImage);
    const imagedata = { capturedImage, TicketId }
    localStorage.setItem('imageData', JSON.stringify(imagedata));
    setStream(null);
    // handlePostImage();
  };
  // results.entryDateTime = new Date(results.entryDateTime);
  return (
    <div className='container'>
      {
        results ? (
          <div className='card'>
            <div style={{ padding: 44, paddingTop: 16, paddingBottom: 16 }}>
              <div className='header'>
                <img src={LOGO} alt="logo" width={147} height={56} />
                <span className='headingText'>Parking Clip</span>
              </div>
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
                    <img src={Location} alt="location" width={10} height={13} />
                    <span style={{ marginLeft: 7 }}>{results.parkingLocation}</span>
                  </div>
                  <span style={{ color: '#21BECC', fontWeight: '700' }}>{results.ticketId}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='center' style={{ marginBottom: 16 }}>
                  <img src={results.qrCode} alt="logo" width={200} height={200} />
                </div>
              </div>
              {results.valletNumber ? (<div style={{ marginBottom: 16 }}>          <span className='entryText'>Vallet Number</span>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{results.valletNumber}</span>
                </div></div>) : (null)}


              <div style={{ marginBottom: 16 }}>
                <span className='entryText'>Entry Details</span>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {/* <span>{results.entryDateTime}</span> */}
                  <span>{results.entryDateTime.getDate()} / {results.entryDateTime.getMonth() + 1} / {results.entryDateTime.getFullYear()}</span>
                  <span>{results.entryDateTime.getHours()}:{results.entryDateTime.getMinutes()} Hrs</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{results.vehicleType} - {results.vehicleRegistrationNo}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Contact No - {results.mobileNo}</span>
                </div>
              </div>
              {results.exitDateTime ? (<div>       <span className='entryText'>Exit Details</span>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{results.exitDateTime.getDate()} / {results.exitDateTime.getMonth() + 1} / {results.exitDateTime.getFullYear()}</span>
                  <span>{results.exitDateTime.getHours()}:{results.exitDateTime.getMinutes()} Hrs</span>
                </div></div>
              ) : (null)}
              {/* <span className='entryText' style={{marginBottom: 16}}>Entry Details</span> */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>

                <div className='borderContainer' style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 30 }}> ₹  {results.ticketPaymentDetails.parkingCharges.totalRent}</span>
                </div>
              </div>
              <span className='entryText'>Rent breakup</span>
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


              <span className='entryText'>Stored Vehicle Location Detials</span>
              <div>
                <div className='borderContainer' style={{ marginTop: 10, marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                  <div className="details">
                    <label>
                      Enter Location Details:
                      <input type="text" value={additionalInfo} onChange={handleAdditionalInfoChange} />
                    </label>
                    <button onClick={handleSaveAdditionalInfo}>Save</button>            </div>
                  <div className="details">
                    {stream === null ? (<img src={image} alt="" />) : (null)}
                    {stream === null ? (
                      // {image?(<img src={image} alt="" />):(null)}
                      <button style={{ width: '30%', height: 'fit-content' }} onClick={handleStartCamera}>Click a Picture</button>
                    ) : (
                      <div>
                        <Webcam
                          audio={false}
                          width={'65%'}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          videoConstraints={{
                            facingMode: "environment",
                            width: '250px',
                            // torch: torchMode
                          }}
                          className="webcam"
                        />
                        {/* <button onClick={() => setTorchMode(!torchMode)}>Toggle Torch</button> */}
                        <button style={{ width: '30%', marginLeft: '5%' }} onClick={handleTakePicture}>Click</button>
                      </div>
                    )}
                  </div>
                  <div className="details" style={{ border: 'none' }}>
                    {location ? (
                      <div>
                        <p>Location captured: {location.latitude}, {location.longitude}</p>
                        {/* <p>Additional information: {additionalInfo}</p> */}
                        <div className="details">
                          <button style={{ width: 'auto' }} onClick={handleNavigateToLocation}>Navigate to Location</button>
                          <button style={{ width: 'auto' }} onClick={handleCaptureLocation}>Re-Capture Location</button>
                        </div>
                      </div>
                    ) : (<button onClick={handleCaptureLocation}>Capture Location</button>)}

                  </div>
                </div>
              </div>

              {/* <div style={{display: 'flex', justifyContent: 'center', marginBottom: 10}}>
            <button>Pay now</button>
          </div> */}
              {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 20 }}> Contact us </span>
              </div> */}
              {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', width: 200, justifyContent: 'space-between' }}>
                  <img className='icons' height={23} width={23} src={forms} alt="forms" />
                  <img className='icons' height={23} width={23} src={facebookColor} alt="forms" />
                  <img className='icons' height={20} width={24} src={gmail} alt="forms" />
                  <img className='icons' height={27} width={27} src={whatsapp} alt="forms" />
                </div>
              </div> */}
            </div>
            {/* <footer className="footer">
              <div className="footer__options">
                <a href="/about-us">About us</a>
                <a href="/parking-clip">Parking clip</a>
                <a href="/help">Help</a>
                <a href="/terms-and-conditions">Terms &amp; Conditions</a>
                <a href="/privacy-policy">Privacy policy</a>
              </div>
              <div style={{ display: 'flex', width: 150, justifyContent: 'space-between', marginBottom: 16, marginTop: 16 }}>
                <img className='icons' height={30} width={30} src={Twitter} alt="forms" />
                <img className='icons' height={30} width={30} src={Facebook} alt="forms" />
                <img className='icons' height={30} width={30} src={Insta} alt="forms" />
              </div>
              <p className="footer__copy">&copy; 2023 Parking Clip. All rights reserved.</p>
            </footer> */}
          </div>

        ) : (<div>Ticket id not found</div>)
      }
    </div>
  );
}

export default UserUI;
