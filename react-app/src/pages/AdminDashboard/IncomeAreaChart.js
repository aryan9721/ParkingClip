import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import api from '../api';

// chart options
const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot, location, business }) => {
    // console.log(slot,location);
    const theme = useTheme();
    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;
    const [options, setOptions] = useState(areaChartOptions);
    const [series, setSeries] = useState([{ name: 'Tickets Generated', data: [0, 86, 28, 115, 48, 210, 136] }]);
    const [loading, setLoading] = useState(true);
    const baseURL = api +
    "api/parkings/vehicle/tickets?businessId="+ business.businessId+"&location=" + location.name;
    // console.log(baseURL);
    const [Tickets, setTickets] = useState([]);

    useEffect(() => {
        getTickets();
    }, [location]);

    const getTickets = () => {
        try {
            axios.get(baseURL).then((response) => {
                // console.log('tickets',response);
                setTickets(response.data.data.data);
            });
        } catch (error) {
            // console.log('error',error);
        }
    };

    useEffect(() => {
        if (Tickets) {
            const countByDate = {};
            const daysArray = [];
            const countArray = [];
            const countByMonth = {};
            const monthsArray = [];

            // Create a new Date object for the current date
            const currentDate = new Date();

            // Array of weekdays to map the day index returned by getDay()
            const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            if (slot === 'month') {
                const currentDate = new Date();

                // Array of months to map the month index returned by getMonth()
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                // Loop through the last 12 months
                for (let i = 0; i < 12; i++) {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                    const monthOfYear = months[date.getMonth()];
                    monthsArray.unshift(monthOfYear);

                    countByMonth[monthOfYear] = 0; // Initialize the count to 0
                }

                // Loop through the array of tickets and increment the count for each month
                Tickets.forEach(ticket => {
                    const date = new Date(ticket.entryDateTime);
                    const monthOfYear = months[date.getMonth()];
                    if (countByMonth[monthOfYear] !== undefined) {
                        countByMonth[monthOfYear]++;
                    }
                });

                // Loop through the monthsArray and populate the countArray with the respective counts
                monthsArray.forEach(month => {
                    countArray.push(countByMonth[month]);
                });

                // console.log(monthsArray);
                // console.log(countArray);
            } else {
                // Loop through the last 6 days
                for (let i = 0; i < 7; i++) {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i);
                    const dayOfWeek = weekdays[date.getDay()];
                    daysArray.unshift(dayOfWeek);

                    countByDate[dayOfWeek] = 0; // Initialize the count to 0
                }

                // Loop through the array of tickets and increment the count for each date
                Tickets.forEach(ticket => {
                    const date = new Date(ticket.entryDateTime);
                    const dayOfWeek = weekdays[date.getDay()];
                    if (countByDate[dayOfWeek] !== undefined) {
                        countByDate[dayOfWeek]++;
                    }
                });

                // Loop through the daysArray and populate the countArray with the respective counts
                daysArray.forEach(day => {
                    countArray.push(countByDate[day]);
                });

                // console.log(daysArray);
                // console.log(countArray);

            }

            setSeries([
                {
                    name: slot === 'month' ? 'Tickets Generated' : 'Tickets Generated (Last 7 days)',
                    data: countArray
                }
            ]);
            setOptions((prevState) => ({
                ...prevState,
                colors: [theme.palette.primary.main, theme.palette.primary[700]],
                xaxis: {
                    categories:
                        slot === 'month'
                            ? monthsArray
                            : daysArray,
                    labels: {
                        style: {
                            colors: [
                                secondary,
                                secondary,
                                secondary,
                                secondary,
                                secondary,
                                secondary,
                                secondary,
                                secondary,
                                secondary,
                                secondary,
                                secondary,
                                secondary
                            ]
                        }
                    },
                    axisBorder: {
                        show: true,
                        color: line
                    },
                    tickAmount: slot === 'month' ? 11 : 7
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: [secondary]
                        }
                    }
                },
                grid: {
                    borderColor: line
                },
                tooltip: {
                    theme: 'light'
                }
            }));

            setLoading(false);
        }
    }, [slot, Tickets]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
};


IncomeAreaChart.propTypes = {
    slot: PropTypes.string
};

export default IncomeAreaChart;
