import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import menuItem from '../../menu-items';

// material-ui
import {
    // Avatar,
    // AvatarGroup,
    Box,
    Button,
    Grid,
    // List,
    // ListItemAvatar,
    // ListItemButton,
    // ListItemSecondaryAction,
    // ListItemText,
    // MenuItem,
    Stack,
    // TextField,
    Typography
} from '@mui/material';

// project import
// import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
// import MonthlyBarChart from './MonthlyBarChart';
// import piechart from './piechart';
// import ReportAreaChart from './ReportAreaChart';
// import SalesColumnChart from './SalesColumnChart';
import MainCard from '../../components/MainCard';
import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';
import { useNavigate } from 'react-router';
import axios from "axios";
import api from '../api';
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


const DashboardDefault = () => {
    const navigate = useNavigate();
    const [Tickets, setTickets] = useState([]);

    const userdata = JSON.parse(localStorage.getItem('userdata'));
    useEffect(() => {
        if (userdata.role === "ADMIN") {
          navigate('/AdminDashboard');
        }
        if (userdata.role === "BUSINESS_OWNER") {
          navigate('/BusinessDashboard');
        }
      }, [userdata.role]);
    
    // console.log(userdata);
    const [results, setresults] = useState([]);

    useEffect(() => {
        getresults();
    }, []);
    //get todo list from database
    const getresults = () => {
        try {
            console.log(api + 'api/businesses/' + userdata.businessId);
            axios.get(api + 'api/businesses/' + userdata.businessId).then((response) => {
                // console.log('reponse',response);
                setresults(response.data.data.locations);
            });
        } catch (error) {
            console.log(error);
        }
    };
    // console.log(results);
    const locationData = results.find((location1) => location1.name === userdata.location);
    // console.log(locationData);

    let totalCapacity = 0;

    if (locationData) {

        for (let i = 0; i < locationData.vehicleDetails.length; i++) {
            totalCapacity += parseInt(locationData.vehicleDetails[i].capacity);
        }
        //   console.log(totalCapacity);
    }
    const baseURL =
        api + "api/parkings/vehicle/tickets?limit=10000";

    useEffect(() => {
        getTickets();
    }, []);

    const getTickets = () => {
        try {
            axios.get(baseURL).then((response) => {
                //   console.log('tickets',response.data.data.data);
                setTickets(response.data.data.data);
            });
        } catch (error) {
            // console.log('error',error);
        }
    };
    // const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');
    var token = localStorage.getItem('token');
    if (!token) {
        navigate('/app');
    }
    // console.log(locationData.vehicleDetails);
    const counts = {};
    let totalcount = 0;
    if (Tickets) {
        for (let vehicle of Tickets) {
            if(vehicle.parkingStatus === 'PARKED')
            {
                totalcount++;
                if (counts[vehicle.vehicleType]) {
                    counts[vehicle.vehicleType]++;
                } else {
                    counts[vehicle.vehicleType] = 1;
                }
            }
        }
    }
    // console.log(Tickets);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                <AnalyticEcommerce title="Total Vacant Slots" count="5000 / 10000" percentage={50} />
            </Grid> */}
            {/* <Grid item xs={12} sx={{ mb: -2.25 }}> */}

            {locationData && counts && locationData.vehicleDetails.map((vehicle, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <AnalyticEcommerce title={`${vehicle.type}`} count={`${counts[vehicle.type] ? counts[vehicle.type] : 0}  / ${vehicle.capacity}`}
                    // percentage={(counts[vehicle.type]?counts[vehicle.type]:0)*100/(vehicle.capacity)} 
                    />
                </Grid>
            ))}
            {/* </Grid> */}
            {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                <AnalyticEcommerce title="Total Occupied Slots" count="5000" percentage={50} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <AnalyticEcommerce title="Total Slots" count="10000" />
            </Grid> */}
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Sales" count="₹35,078" percentage={27.4} isLoss color="warning" extra="₹20,395" />
            </Grid> */}
            <br></br>
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Tickets Generated</Typography>
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
                        <IncomeAreaChart slot={slot} />
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

            {/* row 3 */}
            {/* <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Recent Orders</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <OrdersTable />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Analytics Report</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                        <ListItemButton divider>
                            <ListItemText primary="Company Finance Growth" />
                            <Typography variant="h5">+45.14%</Typography>
                        </ListItemButton>
                        <ListItemButton divider>
                            <ListItemText primary="Company Expenses Ratio" />
                            <Typography variant="h5">0.58%</Typography>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Business Risk Cases" />
                            <Typography variant="h5">Low</Typography>
                        </ListItemButton>
                    </List>
                    <ReportAreaChart />
                </MainCard>
            </Grid> */}

            {/* row 4 */}
            {/* <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Sales Report</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
                        >
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                    <Stack spacing={1.5} sx={{ mb: -12 }}>
                        <Typography variant="h6" color="secondary">
                            Net Profit
                        </Typography>
                        <Typography variant="h4">₹1560</Typography>
                    </Stack>
                    <SalesColumnChart />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Transaction History</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <List
                        component="nav"
                        sx={{
                            px: 0,
                            py: 0,
                            '& .MuiListItemButton-root': {
                                py: 1.5,
                                '& .MuiAvatar-root': avatarSX,
                                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                            }
                        }}
                    >
                        <ListItemButton divider>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'success.main',
                                        bgcolor: 'success.lighter'
                                    }}
                                >
                                    <GiftOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        + ₹1,430
                                    </Typography>
                                    <Typography variant="h6" color="secondary" noWrap>
                                        78%
                                    </Typography>
                                </Stack>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <ListItemButton divider>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'primary.main',
                                        bgcolor: 'primary.lighter'
                                    }}
                                >
                                    <MessageOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="subtitle1">Order #984947</Typography>}
                                secondary="5 August, 1:45 PM"
                            />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        + ₹302
                                    </Typography>
                                    <Typography variant="h6" color="secondary" noWrap>
                                        8%
                                    </Typography>
                                </Stack>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'error.main',
                                        bgcolor: 'error.lighter'
                                    }}
                                >
                                    <SettingOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        + ₹682
                                    </Typography>
                                    <Typography variant="h6" color="secondary" noWrap>
                                        16%
                                    </Typography>
                                </Stack>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    </List>
                </MainCard>
                <MainCard sx={{ mt: 2 }}>
                    <Stack spacing={3}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Stack>
                                    <Typography variant="h5" noWrap>
                                        Help & Support Chat
                                    </Typography>
                                    <Typography variant="caption" color="secondary" noWrap>
                                        Typical replay within 5 min
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                                    <Avatar alt="Remy Sharp" src={avatar1} />
                                    <Avatar alt="Travis Howard" src={avatar2} />
                                    <Avatar alt="Cindy Baker" src={avatar3} />
                                    <Avatar alt="Agnes Walker" src={avatar4} />
                                </AvatarGroup>
                            </Grid>
                        </Grid>
                        <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                            Need Help?
                        </Button>
                    </Stack>
                </MainCard>
            </Grid> */}
        </Grid>
    );
};

export default DashboardDefault;
