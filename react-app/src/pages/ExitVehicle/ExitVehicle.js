import React, { useState, useEffect } from "react";
import { QrReader } from 'react-qr-reader';
import api from '../api';
import axios from "axios";
import './ExitVehicle.css';
import {
    Alert,
  } from '@mui/material';
  import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const ExitVehicle = () => {
    const [isScanning, setIsScanning] = useState(true);
    const ticketURL = api+ "api/parkings/vehicle/ticketById/";
    const [results, setresults] = useState('');
    const [exitresult,setExitresult] = useState('');
    const [flag,setFlag] = useState(true);
    const handleScan = async (e) => {
      e.preventDefault();
    //   setFlag(true);
    //   console.log("scan",isScanning);
      setIsScanning(!isScanning);
    };
    function exitvehicle(){
        const exitURL = api+ "api/parkings/vehicle/ticketStatus/";
        axios.put(exitURL+results.ticketId+'/EXITED').then((response) => {
            console.log(response);
        setExitresult(response);

        //   results.entryDateTime = new Date(results.entryDateTime);
        });
    }
    const handleError = (err) => {
      console.error(err);
    };
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
    const [qrData, setQrData] = useState('');
    const handleScanResult =  (result) => {
        if(flag)
        {
            if(qrData=='' && result)
            {
                setQrData(JSON.parse(result));
                var data = JSON.parse(result);
                if(data.ticketId)
                {
                  var ticketId = data.ticketId;
                  axios.get(ticketURL+ticketId).then((response) => {
                      // console.log(response.data.data);
                    setresults(response.data.data);
                  //   results.entryDateTime = new Date(results.entryDateTime);
                  });
                  setIsScanning(false);
                }
                else{
                  alert('invalid QR code!')
                }
                
            }
            setFlag(false);
        }

    };
    function refreshPage() {
        window.location.reload(false);
      }
    // console.log(results);
  return (
    <div style={{width: '100%'}}>
    {/* <button onClick={handleScan}>Scan QR Code</button> */}
    <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Modal Title</DialogTitle> */}
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Scan Another
          </Button>
        </DialogActions>
      </Dialog>
    
    {results?(  <div className='container'>
        <div className="ticket">
        {exitresult!=='' && <Alert severity="success">{exitresult.data.message}</Alert>}
        {/* <div className='header'>
          <img src={LOGO} alt="logo" width={147} height={56} />
          <span className='headingText'>Parking Clip</span>
        </div> */}
        <div className='wrapper'>
          <span style={{ fontSize: 30, linHeight: 39, marginBottom: 30}}>
            Ticket
          </span>
        </div>
        <div style={{marginBottom: 18}}>
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
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className='center' style={{marginBottom: 16}}>
          <img src={results.qrCode} alt="logo" width={200} height={200} />
        </div>
        </div>


        <div style={{marginBottom: 16}}>
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
          <span className='entryText' style={{marginBottom: 16}}>Total Rent</span>
          <div style={{display: 'flex', justifyContent: 'center'}}>

          <div className='borderContainer' style={{marginBottom: 16}}>
            <span style={{fontSize: 30}}> ₹  {results.ticketPaymentDetails.parkingCharges.totalRent}</span>
          </div>
        </div>
        <span>Rent breakup</span>
        <div>
        <div className='borderContainer' style={{height: 135, marginTop: 10, marginBottom: 20, alignItems: 'center', justifyContent: 'center'}}>
        <div className="details">
              <span> Rent per Hour</span><span> {results.ticketPaymentDetails.parkingCharges.perHrRent} </span>
            </div>            
            <div className="details">
              <span> Vallet Charges </span><span>{results.ticketPaymentDetails.parkingCharges.valletCharges} </span>
            </div>            
            <div className="details" style={{border: 'none'}}>
              <span> Total Time Hr </span><span>{results.ticketPaymentDetails.parkingCharges.totalTimeHr} </span>
            </div>
          </div>
        </div>
        {results.parkingStatus != "EXITED"?(        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 10}}>
          <button onClick={exitvehicle}>Exit Vehicle</button>
        </div>):(
            <span>Parking Status: {results.parkingStatus}</span>
        )}

        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 16}}>
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
        
    </div>):(    isScanning && (
      <div>
      <QrReader
      delay={1000}
      onError={handleError}
      onResult={handleScanResult}
      style={{ width: '100%' }}
      constraints={ {facingMode: 'environment'} }
    />
        </div>


    ) )}

      </div>
  )
}

export default ExitVehicle