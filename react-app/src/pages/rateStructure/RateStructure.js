import "./RateStructure.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import api from '../api';
import { Alert,
} from '@mui/material';
const RateStructure = () => {

  const data = JSON.parse(localStorage.getItem('userdata'));
  const [results, setresults] = useState([]);

  useEffect(() => {
    getresults();
  }, []);
  //get todo list from database
  const getresults = () => {
    axios.get(api+'api/businesses/'+data.userId).then((response) => {
      // console.log(response.data.data.locations);
      setresults(response.data.data.locations);
      setlocation(response.data.data.locations[0].name);
      setVehicleType(response.data.data.locations[0].vehicleDetails[0].type)
    });
  };


  const [resultData, setresultData] = useState("");
  const [message, setMessage] = useState('');
  const [location, setlocation] = useState('no location found');

  // if (results[0]) {
  //   setlocation(results[0].name);
  // }
  // const [location, setlocation] = useState(results[0] && results[0].name || false);
  const [vehicleType, setVehicleType] = useState(null);
  const [rentPerHr, setrentPerHr] = useState(0);
  const [maxDailyRent, setmaxDailyRent] = useState(0);
  const [mincharge, setmincharge] = useState(0);
  const [valletCharges, setvalletCharges] = useState(0);
  const [roundingUpTo, setroundingUpTo] = useState(0);
  const [maxcap, setmaxcap] = useState(true);
  const [isDayEndMidnight, setisDayEndMidnight] = useState(true);
  const [isValletApplicable, setisValletApplicable] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlelocation = (event) => {
    const location = event.target.value;
    setlocation(location);

    setVehicleType(vehicleTypes[0]);
  };

  const handleVehicleType = (event) => {
    const vehicleType = event.target.value;
    setVehicleType(vehicleType);
  };

  const handlerentPerHr = (event) => {
    const rentPerHr = event.target.value;
    setrentPerHr(rentPerHr);
  };   
  
  const handlemaxDailyRent = (event) => {
    const maxDailyRent = event.target.value;
    setmaxDailyRent(maxDailyRent);
  };  
  
  const handlemincharge = (event) => {
    const mincharge = event.target.value;
    setmincharge(mincharge);
  };  
  
  const handlevalletCharges = (event) => {
    const valletCharges = event.target.value;
    setvalletCharges(valletCharges);
  };

  const handleroundingUpTo = (event) => {
    const roundingUpTo = event.target.value;
    setroundingUpTo(roundingUpTo);
  };
  
  const handlemaxcap = (event) => {
    const maxcap = event.target.value;
    setmaxcap(maxcap);
  }; 
  const handleisDayEndMidnight = (event) => {
    const isDayEndMidnight = event.target.value;
    setisDayEndMidnight(isDayEndMidnight);
  };  
  
  const handleisValletApplicable = (event) => {
    const isValletApplicable = event.target.value;
    setisValletApplicable(isValletApplicable);
  };
  const selectedLocationData = results.find((location1) => location1.name === location);
  const vehicleTypes = selectedLocationData ? selectedLocationData.vehicleDetails.map((vehicle) => vehicle.type) : [];
  // console.log(selectedLocationData);
  // console.log(vehicleType);
  const submitUser = async (e) => {
    e.preventDefault();
    const localdata = JSON.parse(localStorage.getItem('userdata'));

    const userdata = {
        vehicleType: vehicleType,
        rentPerHr: rentPerHr,
        maxDailyRent: maxDailyRent,
        valletCharges: valletCharges,
        businessId: localdata.businessId,
        minimumCharges: mincharge,
        location: location,
        maxCapping: maxcap, 
        roundingUpTo: roundingUpTo,
        isValletApplicable: isValletApplicable,
        isDayEndMidnight: false
    };
    // console.log("sending data: ", userdata);
    await axios
      .post(
        api+ "api/businesses/rates",
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
            <h3>Define Rate Structure</h3>
            {/* <hr style={{width: "100%", position: "absolute"}}></hr> */}
            {message!=='' && <Alert severity="success">{message}</Alert>}
            <form onSubmit={submitUser}>

              {/* <div style={{ width: "100%" }} className="formInput">
                <label>Parking Location</label>
                <input
                  disabled="true"
                  style={{ backgroundColor: "lightgrey", color: "#000000" }}
                  type={Text}
                  placeholder={"Pacific mall, Pune"}
                />
              </div>
              <div style={{ width: "100%" }} className="formInput">
                <label>Ticket number</label>
                <input
                  disabled="true"
                  style={{ backgroundColor: "lightgrey", color: "#000000" }}
                  type={Text}
                  placeholder={"A123456"}
                />
              </div>
              <div className="formInput">
                <label>Entry date</label>
                <input
                  disabled="true"
                  style={{ backgroundColor: "lightgrey", color: "#000000" }}
                  type={Text}
                  placeholder={date.toDateString()}
                />
              </div>
              <div className="formInput">
                <label>Entry time</label>
                <input
                  disabled="true"
                  style={{ backgroundColor: "lightgrey", color: "#000000" }}
                  type={Text}
                  placeholder={date.toLocaleTimeString()}
                />
              </div>
              <h4 style={{ width: "100%", marginTop: 0, marginBottom: 0}}>Details*</h4> */}
                <div className="formInput">
                <label>Select Location</label>

                <select id="locationSelect" onChange={handlelocation}>
                {/* <option value="">{results[0].name}</option> */}
                {results.map((location) => (
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
              <div className="formInput">
                <label>Rent/HR</label>
                <input
                  required
                  onChange={(e) => handlerentPerHr(e)}
                  type={Text}
                  placeholder={"Rs. "}
                />
              </div>

              <div className="formInput">
                <label>Mininum Charge</label>
                <input required 
                  onChange={(e) => handlemincharge(e)}
                  type={Text}
                  placeholder={"Rs. "}
                />
              </div>

              <div className="formInput">
                <label>Rounding Unit</label>
                <input required 
                  onChange={(e) => handleroundingUpTo(e)}
                  type={Text}
                  placeholder={"Rs. "}
                />
              </div>
              <FormControl style={{width: "48%"}}>
                <FormLabel id="demo-row-radio-buttons-group-label">is Day End Midnight?</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => handleisDayEndMidnight(e)}
                    defaultValue="false"
                >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>

              <FormControl style={{width: "48%"}}>
                <FormLabel id="demo-row-radio-buttons-group-label">Max Capping?</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => handlemaxcap(e)}
                    defaultValue="false"
                >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
            {maxcap=="true"?(              <div className="formInput">
                <label>Max Daily Rent</label>
                <input required 
                  onChange={(e) => handlemaxDailyRent(e)}
                  type={Text}
                  placeholder={"Rs. "}
                />
              </div>):(null)}


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
                <label>Vallet Charges</label>
                <input required 
                  onChange={(e) => handlevalletCharges(e)}
                  type={Text}
                  placeholder={"Rs. "}
                />
              </div>):(null)}

              <button>Save</button>
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

export default RateStructure;
