import "./LocationVehicleRecord.css";
import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { QrReader } from 'react-qr-reader';
import { Modal, Button } from '@material-ui/core';
// App.js
import 'mdbreact/dist/css/mdb.css';
import { utils } from 'xlsx';

// import HttpService from '../../utils/httpService';
import api from '../api';
import axios from "axios";

const LocationVehicleRecord = () => {
  const userdata = JSON.parse(localStorage.getItem('userdata'));

  const [locations, setlocations] = useState([]);
  const [location, setlocation] = useState('no location found');
  const handlelocation = (event) => {
    const location = event.target.value;
    setlocation(location);
  };
  let [totalRevenue, settotalRevenue]=useState(0);

  useEffect(() => {
    getlocations();
  }, []);

  const getlocations = () => {
    axios.get(api + 'api/businesses/' + userdata.userId).then((response) => {
      // console.log(response);
      setlocations(response.data.data.locations);
      setlocation(response.data.data.locations[0].name);
    });
  };

  const baseURL =
    api + "api/parkings/vehicle/tickets?limit=10000&location="+location;

  const [results, setresults] = useState([]);
  useEffect(() => {
    getresults();
  }, [location]);

  const getresults = () => {
    // console.log('base',baseURL);
    axios.get(baseURL).then((response) => {
      console.log(response);
      // console.log(response.data.data.data);
      // response.data.data.data.forEach(element => {
      //   element.qrCode = <img src={element.qrCode} alt="Product" width={200} height={200} />
      // });
      setresults(response.data.data.data);
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [exitresult,setExitresult] = useState('');
  function exitvehicle(){
    const exitURL = api+ "api/parkings/vehicle/ticketStatus/";
    axios.put(exitURL+ticketData.ticketId+'/EXITED').then((response) => {
        // console.log(response);
    setExitresult(response);

    //   results.entryDateTime = new Date(results.entryDateTime);
    });
}

  function showTicket(row) {
    // console.log(row);
    setTicketData(row);
    setShowModal(true);
  }
  // useEffect(() => {
  //   getticket();
  // }, []);

  // const getticket = () => {
  //   axios.get(ticketURL).then((response) => {
  //     // console.log(response.data.data);
  //     setticket(response.data.data.data);
  //   });
  // };
  const data = {
    columns: [
      // {
      //   label: "QR",
      //   field: "qrCode",
      // },
      {
        label: "Ticket ID",
        field: "ticketId",
        width: 150,
      },
      {
        label: "Vehicle Type",
        field: "vehicleType",
        width: 150,
      },
      {
        label: "Vehicle Number",
        field: "vehicleRegistrationNo",
        width: 270,
      },
      {
        label: "Contact Number",
        field: "mobileNo",
        width: 200,
      },
      {
        label: "Check-in date",
        field: "entryDate",
        // sort: "dsc",
        width: 100,
      },
      {
        label: "Check-in time",
        field: "entryTime",
        // sort: "dsc",
        width: 100,
      },
      {
        label: "Exit date",
        field: "exitDate",
        // sort: "dsc",
        width: 100,
      },
      {
        label: "Exit time",
        field: "exitTime",
        // sort: "dsc",
        width: 100,
      },
      {
        label: "Location",
        field: "parkingLocation",
        width: 100,
      },
      {
        label: "Total Rent",
        field: "rent",
        sort: "asc"
      },
      {
        label: "Status",
        field: "parkingStatus",
      },
      {
        label: "Action",
        field: "actions",
        width: 50,
        sort: false,
      },

    ],
    rows: results && results.map((row) => ({ // Add a check before calling map
      qrCode: row.qrCode,
      ticketId: row.ticketId,
      vehicleType: row.vehicleType,
      vehicleRegistrationNo: row.vehicleRegistrationNo,
      mobileNo: row.mobileNo,
      entryDate: new Date(row.entryDateTime).toLocaleDateString(),
      entryTime: new Date(row.entryDateTime).toLocaleTimeString(),
      exitDate: row.exitDateTime? new Date(row.exitDateTime).toLocaleDateString():'NA',
      exitTime: row.exitDateTime? new Date(row.exitDateTime).toLocaleTimeString(): 'NA',
      parkingLocation: row.parkingLocation,
      parkingStatus: row.parkingStatus,
      rent: row.parkingStatus == "EXITED" ? row.ticketPaymentDetails.parkingCharges.totalRent : row.ticketPaymentDetails.parkingCharges.totalRent + " (due)" ,
      actions: <button onClick={() => showTicket(row)}>Show Ticket</button> // Add a button to each row
    })),
  };
  // console.log(data);
  const handleExportToCSV = () => {
    const fileName = 'table_data.csv';
    const rows = data.rows;
    const separator = ',';
    const keys = Object.keys(rows[0]).filter(key => key !== 'qrCode' && key !== 'actions');
  
    let csvContent = '';
    csvContent += keys.join(separator) + '\n';
  
    rows.forEach((row) => {
      const values = keys.map((key) => {
        return row[key];
      });
      csvContent += values.join(separator) + '\n';
    });
    console.log(csvContent);
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  return (
    <div>
      {
        ticketData ? (<Modal open={showModal} onClose={() => setShowModal(false)}>
          {/* <div className='container'> */}
            <div className="ticket">
              {/* {exitresult!=='' && <Alert severity="success">{exitresult.data.message}</Alert>} */}
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
                  <span style={{ fontSize: 20 }}>{ticketData.businessName}</span>
                  <span >Ticket No. </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <span>{ticketData.parkingLocation}</span>
                  </div>
                  <span style={{ color: '#21BECC', fontWeight: '700' }}>{ticketData.ticketId}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='center' style={{ marginBottom: 16 }}>
                  <img src={ticketData.qrCode} alt="logo" width={200} height={200} />
                </div>
              </div>


              <div style={{ marginBottom: 16 }}>
                <span className='entryText'>Entry Details</span>
                {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{ticketData.entryDateTime.getUTCDate()} / {ticketData.entryDateTime.getUTCMonth()} / {ticketData.entryDateTime.getUTCFullYear()}</span>
              <span>{ticketData.entryDateTime.getUTCHours()}:{ticketData.entryDateTime.getUTCMinutes()} Hrs</span>
            </div> */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{ticketData.vehicleType} - {ticketData.vehicleRegistrationNo}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Contact No - {ticketData.mobileNo}</span>
                </div>
              </div>
              <span className='entryText' style={{ marginBottom: 16 }}>Total Rent</span>
              <div style={{ display: 'flex', justifyContent: 'center' }}>

                <div className='borderContainer' style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 30 }}> ₹  {ticketData.ticketPaymentDetails.parkingCharges.totalRent?ticketData.ticketPaymentDetails.parkingCharges.totalRent:0}</span>
                </div>
              </div>
              <span>Rent breakup</span>
              <div>
                <div className='borderContainer' style={{ height: 135, marginTop: 10, marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                  <div className="details">
                    <span> Rent per Hour</span><span> {ticketData.ticketPaymentDetails.parkingCharges.perHrRent?ticketData.ticketPaymentDetails.parkingCharges.perHrRent:0} </span>
                  </div>
                  <div className="details">
                    <span> Vallet Charges </span><span>{ticketData.ticketPaymentDetails.parkingCharges.valletCharges?ticketData.ticketPaymentDetails.parkingCharges.valletCharges:0} </span>
                  </div>
                  <div className="details" style={{ border: 'none' }}>
                    <span> Total Time Hr </span><span>{ticketData.ticketPaymentDetails.parkingCharges.totalTimeHr?ticketData.ticketPaymentDetails.parkingCharges.totalTimeHr:0} </span>
                  </div>
                </div>
              </div>
              {ticketData.parkingStatus != "EXITED" ? (<div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                <button  onClick={exitvehicle}>Exit Vehicle</button>
              </div>) : (
                <span>Parking Status: {ticketData.parkingStatus}</span>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                {/* <span style={{fontSize: 20}}> Contact us </span> */}
              </div>
            </div>

          {/* </div> */}
        </Modal>) : (null)
      }

<div className="formInput" style={{ display: 'flex', alignItems: 'center' }}>
              <h4>Vehicle Record for </h4>

                <select id="locationSelect" onChange={handlelocation} style={{ marginLeft: '10px' }}>
                    {locations.map((location) => (
                        <option value={location.name}>{location.name}</option>
                    ))}
                </select>
            </div>      <MDBDataTable
        noBottomColumns style={{ lineHeight: "normal", whiteSpace: "pre", justifyContent: "center" }} striped       
        bordered small data={data} />
      <button onClick={handleExportToCSV}>Download Report</button>

    </div>
  );
};

export default LocationVehicleRecord;
