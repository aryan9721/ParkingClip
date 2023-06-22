import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import api from '../api';
// import HttpService from '../../utils/httpService'
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    margin: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const TestRent = () => {
    const baseURL =
    api+ "api/businesses/rates/";

    const userdata = JSON.parse(localStorage.getItem('userdata'));
    // console.log(userdata);
    // const [post, setPost] = React.useState(null);

  // const [todo, setTodo] = useState("");

  //reading data from database
  const [results, setresults] = useState([]);
  const[rent, setrent] = useState(null);

  useEffect(() => {
    getresults();
  }, []);
  //get todo list from database
  const getresults = () => {
    axios.get(baseURL+userdata.businessId).then((response) => {
      // console.log(response);
      setresults(response.data.data);
    });
  };
  // console.log("results.data", results);

  const [tempresults, settempresults] = useState([]);

  useEffect(() => {
    gettempresults();
  }, []);
  //get todo list from database
  const gettempresults = () => {
    axios.get(api+'api/businesses/'+userdata.businessId).then((response) => {
      console.log(response.data.data.locations);
      settempresults(response.data.data.locations);
      setlocation(response.data.data.locations[0].name);
      setVehicleType(response.data.data.locations[0].vehicleDetails[0].type)

    });
  };

  const data = {
    columns: [
      {
        label: "Business Id",
        field: "businessId",
      },
      {
        label: "location",
        field: "location",
        width: 150,
      },
      {
        label: "Vehicle Type",
        field: "vehicleType",
        width: 270,
      },
      {
        label: "Vallet Charges",
        field: "valletCharges",
        width: 200,
      },
      {
        label: "Rounding Up To",
        field: "roundingUpTo",
        width: 100,
      },
      {
        label: "Rent Per Hr",
        field: "rentPerHr",
        width: 150,
      },
      {
        label: "Minimum Charges",
        field: "minimumCharges",
        width: 100,
      },
      {
        label: "Max Capping?",
        field: "maxCapping",
        sort: "asc",
        width: 100,
      },
      {
        label: "Max Daily Rent",
        field: "maxDailyRent",
        sort: "asc",
        width: 100,
      },      {
        label: "Is Vallet Applicable",
        field: "isValletApplicable",
        sort: "asc",
        width: 100,
      },
      {
        label: "Is Day End Midnight",
        field: "isDayEndMidnight",
        sort: "asc",
        width: 100,
      },
    ],
    rows: results,
  };
  const [location, setlocation] = useState('no location found');
  const [vehicleType, setVehicleType] = useState(null);

  const classes = useStyles();
  // const [vehicleType, setVehicleType] = useState('Car');
  const [entryDateTime, setEntryDateTime] = useState(new Date());
  const [exitDateTime, setExitDateTime] = useState(new Date());
  const [vehicleTypes,setVehicleTypes] = useState(["Car"]);
  const handlelocation = (event) => {
    const loc = event.target.value;
    setlocation(loc);
    setVehicleType(vehicleTypes[0]);
  };

  const handleVehicleType = (event) => {
    const vehicle = event.target.value;
    setVehicleType(vehicle);
  };
  // const selectedLocationData = tempresults.find((location1) => location1.name === location);
  // const vehicleTypes = selectedLocationData ? selectedLocationData.vehicleDetails.map((vehicle) => vehicle.type) : [];
  useEffect(() => {
    const selectedLocationData = tempresults.find((location1) => location1.name === location);
    setVehicleTypes(selectedLocationData ? selectedLocationData.vehicleDetails.map((vehicle) => vehicle.type) : []);
    }, [location]);
  
  const handleEntryDateTimeChange = (event) => {
    const selectedDate = new Date(event.target.value);
    selectedDate.setHours(selectedDate.getHours() - 6);
    selectedDate.setMinutes(selectedDate.getMinutes() - 30);
    setEntryDateTime(selectedDate);
  };
  
  const handleExitDateTimeChange = (event) => {
    const selectedDate = new Date(event.target.value);
    selectedDate.setHours(selectedDate.getHours() - 6);
    selectedDate.setMinutes(selectedDate.getMinutes() - 30);
    setExitDateTime(selectedDate);
  };
  

  const handleRentCalculation = () => {
    // Call rent calculation function with selected vehicle type and date/time inputs
    const parkingTicketDb = {
        isRentBasis: true,
        entryDateTime: entryDateTime,
        exitDateTime: exitDateTime,
        isValletApplicable: false
        };
        const rateStructureDb = results.find(obj => obj['vehicleType'] === vehicleType && obj['location'] === location);
        console.log('rate Structure',rateStructureDb);
        setrent(rentCalculus(rateStructureDb, parkingTicketDb));
        console.log(rent);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        {/* <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel> */}
        {/* <select labelId="vehicle-type-label" id="vehicle-type-select" value={vehicleType} onChange={handleVehicleTypeChange}>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
          <option value="3 wheeler">3 Weeler</option>
        </select> */}

<div className="formInput">
                <label>Select Location</label>

                <select id="locationSelect" onChange={handlelocation}>
                {/* <option value="">{results[0].name}</option> */}
                {tempresults.map((location) => (
                  <option value={location.name}>{location.name}</option>
                ))}
              </select>
                </div>


                {location && (
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
                )}
      </FormControl>
      <br />
      <span>Entry Date and Time: </span>
      <br/>
      <input type="datetime-local" id="datetimeInput" onChange={handleEntryDateTimeChange} />
      <br />
      <span>Entry Date and Time: </span>
      <br/>
      <input type="datetime-local" id="datetimeInput" onChange={handleExitDateTimeChange} />
      <br/><br />
      <button onClick={handleRentCalculation}>Calculate Rent</button>
      {rent? (<div>
      <p>Total Rent: {rent.totalRent}</p>
      <p>Per Hour Rent: {rent.perHrRent}</p>
      <p>Valet Charges: {rent.valletCharges}</p>
      <p>Total Time (in hours): {rent.totalTimeHr}</p>
    </div>):(null)
      }
    </div>
  );
};
function calculateRoundedHourDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const timeDiffInMilliseconds = Math.abs(end - start);
  const hoursDiff = Math.ceil(timeDiffInMilliseconds / (1000 * 60 * 60));

  return hoursDiff;
}

function rentCalculus(rateStructureDb, parkingTicketDb){
    if(parkingTicketDb.isRentBasis){
      // console.log(parkingTicketDb.exitDateTime?parkingTicketDb.exitDateTime.getTime():0)
      // console.log(parkingTicketDb.entryDateTime.getTime())
      
      // let parkedtimeInHr = Math.ceil(((parkingTicketDb.exitDateTime?parkingTicketDb.exitDateTime.getTime(): new Date().getTime()) - parkingTicketDb.entryDateTime.getTime())/3600000 | 1); //createdAt
      let start = parkingTicketDb.entryDateTime;
      let end  = parkingTicketDb.exitDateTime?parkingTicketDb.exitDateTime: new Date();
      let parkedtimeInHr = calculateRoundedHourDifference(start,end);
      
        let totalRent = 0
        let dayRent = 0
        let hrRent = 0
        let timeInHr = parkedtimeInHr
        if(!rateStructureDb.isDayEndMidnight && parkedtimeInHr>24 && rateStructureDb.maxCapping){
            dayRent = Math.floor(parkedtimeInHr/24) * rateStructureDb.maxDailyRent
            timeInHr = parkedtimeInHr%24
        } 
        
        hrRent = (rateStructureDb.rentPerHr*timeInHr)
        
        hrRent = hrRent < rateStructureDb.minimumCharges ? rateStructureDb.minimumCharges: hrRent
        hrRent = rateStructureDb.maxCapping && hrRent > rateStructureDb.maxDailyRent? rateStructureDb.maxDailyRent: hrRent  
        
        totalRent = (dayRent + hrRent) + (parkingTicketDb.isValletApplicable && rateStructureDb.isValletApplicable ? rateStructureDb.valletCharges :0)
        
        totalRent = Math.ceil(totalRent / rateStructureDb.roundingUpTo) * rateStructureDb.roundingUpTo   
        
        
        return {
            totalRent: totalRent,
            perHrRent: rateStructureDb.rentPerHr, 
            valletCharges: parkingTicketDb.isValletApplicable && rateStructureDb.isValletApplicable ? rateStructureDb.valletCharges :0,
            totalTimeHr: parkedtimeInHr            
        }
    }
    else return {
        totalRent: rateStructureDb.maxDailyRent        
    }

}

export default TestRent;
