import { useEffect, useState } from "react";
import axios from "axios";
import api from '../api';
import ReactApexChart from 'react-apexcharts';
import menuItem from '../../menu-items';

// material-ui
import {

    Box,
    Button,
    Grid,

    Stack,
    // TextField,
    Typography
} from '@mui/material';


import IncomeAreaChart from './IncomeAreaChart';
import BusinessChart from './BusinessChart';

import MainCard from '../../components/MainCard';
import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';

// assets
// import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
// import avatar1 from 'assets/images/users/avatar-1.png';
// import avatar2 from 'assets/images/users/avatar-2.png';
// import avatar3 from 'assets/images/users/avatar-3.png';
// import avatar4 from 'assets/images/users/avatar-4.png';

// // avatar style
// const avatarSX = {
//     width: 36,
//     height: 36,
//     fontSize: '1rem'
// };

// // action style
// const actionSX = {
//     mt: 0.75,
//     ml: 1,
//     top: 'auto',
//     right: 'auto',
//     alignSelf: 'flex-start',
//     transform: 'none'
// };

// sales report status
// const status = [
//     {
//         value: 'today',
//         label: 'Today'
//     },
//     {
//         value: 'month',
//         label: 'This Month'
//     },
//     {
//         value: 'year',
//         label: 'This Year'
//     }
// ];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const AdminDashboard = () => {
    const [slot, setSlot] = useState('week');
    const data = JSON.parse(localStorage.getItem('userdata'));
    const [locations, setlocations] = useState([]);
    const [location, setlocation] = useState('no location found');
    const [businesss, setbusinesss] = useState([]);
    const [business, setbusiness] = useState('no business found');
    const [counts, setCounts] = useState({});
    let [totalcount, settotalcount] =  useState(0);
    let [totalRevenue, settotalRevenue]=useState(0);
    // const [locationData,setlocationData] = useState(null);
    const handlelocation = (event) => {
      const location = JSON.parse(event.target.value);
      // console.log('lox',location);
      setlocation(location);
      // setlocationData(location);
    };
  
    // useEffect(() => {
    //   getlocations();
    // }, [business]);
  
    // const getlocations = () => {
    //   axios.get(api + 'api/businesses/' + business.businessId).then((response) => {
    //     setlocations(response.data.data.locations);
    //     setlocation(response.data.data.locations[0].name);
    //   });
    // };


    const handlebusiness = (event) => {
      const business = JSON.parse(event.target.value);
      // console.log(business);
      if (business.locations[0]) {
        setbusiness(business);
        setlocations(business.locations);
        setlocation(business.locations[0]);        
      }
      else
      {
        alert('no location found for Business Selected, Please Reload... ')
      }
    };
  
    useEffect(() => {
      getbusinesss();
    }, []);
  
    const getbusinesss = () => {
      axios.get(api + 'api/businesses').then((response) => {
        // console.log(response.data.data.data);
        setbusinesss(response.data.data.data);
        setbusiness(response.data.data.data[0]);
        setlocations(response.data.data.data[0].locations);
        setlocation(response.data.data.data[0].locations[0]);
      });
    };
    // console.log('locarion',location);
    let locationData = locations.find((location1) => location1.name === location.name);
    // console.log('ld',locationData);
    let totalCapacity = 0;
  
    if (locationData) {
      for (let i = 0; i < locationData.vehicleDetails.length; i++) {
        totalCapacity += parseInt(locationData.vehicleDetails[i].capacity);
      }
    }
    // console.log(locationData);
  //   const baseURL =
  //   api +
  //   "api/parkings/vehicle/tickets/"+ business.businessId+"?location=" +
  //   location.name;
  // console.log(baseURL);

  const [Tickets, setTickets] = useState([]);
  useEffect(() => {
    getTickets();
  }, [locationData]);

  const getTickets = async () => {
    try {
      console.log( api +
        "api/parkings/vehicle/tickets/"+ business.businessId+"?location=" +
        location.name);
      await axios.get( api +
        "api/parkings/vehicle/tickets?businessId="+ business.businessId+"&location=" + location.name).then((response) => {
        if (response.data.message === "No Records Found!") {
          setTickets(response.data.data);
        } else {
          setTickets(response.data.data.data);
        }
        // console.log(response);
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (Tickets) {
      const newCounts = {};
      let temp=0;
      for (let vehicle of Tickets) {
        if (vehicle.parkingStatus === "PARKED") {
          temp++;
          if (newCounts[vehicle.vehicleType]) {
            newCounts[vehicle.vehicleType]++;
          } else {
            newCounts[vehicle.vehicleType] = 1;
          }
        }
      }
      settotalcount(temp);
      setCounts(newCounts);
    }
  }, [Tickets]);

  // console.log(Tickets);

  const RevenueURL =
  api +
  "api/businesses/revenue/"+data.userId+"?location=" +
  location;
// console.log(RevenueURL);
const [Revenue, setRevenue] = useState([]);
useEffect(() => {
  getRevenue();
}, [locationData]);

const getRevenue = async () => {
  try {
    await axios.get(RevenueURL).then((response) => {
      // console.log('revuenue',response);
      if (response.data.message === "No Records Found!") {
        setRevenue(response.data.data);
      } else {
        setRevenue(response.data.data);
      }
    });
  } catch (error) {
    console.log('error', error);
  }
};
useEffect(() => {
  if (Revenue) {
    // console.log(Revenue);
    let temp=0;
    for (let ticket of Revenue) {
      temp+=ticket.totalAmount;
    }
    // console.log(temp);
    settotalRevenue(temp);
  }
}, [Revenue]);


    // console.log(locationData);
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12}>

            <div className="formInput" style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">Dashboard for business: </Typography>
                <select style={{marginLeft: 10, marginRight: 10}} id="businessselect" onChange={handlebusiness}>
                    {/* <option value="">{locations[0].name}</option> */}
                    {businesss.map((bus) => (
                        <option value={JSON.stringify( bus)}>{bus.businessName}</option>
                    ))}
                </select>   
                <Typography variant="h5">At location: </Typography>

                <select style={{marginLeft: 10}} id="locationSelect" onChange={handlelocation}>
                    {/* <option value="">{locations[0].name}</option> */}
                    {locations.map((location) => (
                        <option value={JSON.stringify(location)}>{location.name}</option>
                    ))}
                </select>
            </div>
            </Grid>
            {locationData &&
                locationData.vehicleDetails.map((vehicle, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                        {counts[vehicle.type] !== undefined ? (
                            <AnalyticEcommerce
                                title={`${vehicle.type}`}
                                count={`${counts[vehicle.type]} / ${vehicle.capacity}`}
                            />
                        ) : null}
                    </Grid>
                ))}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Total Revuenue Generated: {totalRevenue}</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" alignItems="center" spacing={0}>
                            <Button
                                size="small"
                                onClick={() => setSlot('month')}
                                color={slot === 'month' ? 'primary' : 'secondary'}
                                variant={slot === 'month' ? 'outlined' : 'text'}
                            >
                                Month
                            </Button>
                            <Button
                                size="small"
                                onClick={() => setSlot('week')}
                                color={slot === 'week' ? 'primary' : 'secondary'}
                                variant={slot === 'week' ? 'outlined' : 'text'}
                            >
                                Week
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                    <BusinessChart slot={slot} location={location} business={business}/>
                    </Box>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Parking Slots Report</Typography>
                    </Grid>
                    <Grid item />
                </Grid>

                <MainCard sx={{ mt: 2 }} content={false}>
                    {totalCapacity && (<Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                Currently
                            </Typography>
                            <Typography variant="h3">{totalcount}/{totalCapacity}</Typography>
                        </Stack>
                    </Box>)}

                    <div id="chart" style={{ marginBottom: 20 }}>
                        <ReactApexChart options={{ labels: ['Occupied', 'Vacant'], legend: { position: 'bottom' } }} series={[totalcount, totalCapacity - totalcount]} type="pie" width={350} />
                    </div>
                </MainCard>
            </Grid>
                        {/* row 2 */}
                        <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Total Tickets Generated: {Tickets.length}</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" alignItems="center" spacing={0}>
                            <Button
                                size="small"
                                onClick={() => setSlot('month')}
                                color={slot === 'month' ? 'primary' : 'secondary'}
                                variant={slot === 'month' ? 'outlined' : 'text'}
                            >
                                Month
                            </Button>
                            <Button
                                size="small"
                                onClick={() => setSlot('week')}
                                color={slot === 'week' ? 'primary' : 'secondary'}
                                variant={slot === 'week' ? 'outlined' : 'text'}
                            >
                                Week
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                    <IncomeAreaChart slot={slot} location={location} business={business} />
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default AdminDashboard;
