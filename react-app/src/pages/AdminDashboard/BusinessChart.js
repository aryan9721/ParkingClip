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

const BusinessChart = ({ slot, location,business }) => {
    // console.log(slot,location);
    const theme = useTheme();
    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;
    const [options, setOptions] = useState(areaChartOptions);
    const [series, setSeries] = useState([{ name: 'Revenue Generated', data: [0, 86, 28, 115, 48, 210, 136] }]);
    const [loading, setLoading] = useState(true);
    const data = JSON.parse(localStorage.getItem('userdata'));
    const RevenueURL =
    api +
    "api/businesses/revenue/"+business.businessId+"?location=" +
    location.name;
  // console.log(RevenueURL);
  const [Revenue, setRevenue] = useState([]);
  useEffect(() => {
    getRevenue();
  }, [location]);

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
        // console.log('revuenue',Revenue);
        if (Revenue) {
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
                // Loop through the array of BusinessChart and increment the count for each month
                Revenue.forEach(ticket => {
                    // const dateString = '19-3-2023';
                    const dateParts = ticket.date.split('-');
                    const month = parseInt(dateParts[1]) - 1; // JavaScript months are zero-indexed
                    // console.log(month); // Output: 2 (March)
                    const monthOfYear = months[month];
                    if (countByMonth[monthOfYear] !== undefined) {
                        countByMonth[monthOfYear]+=ticket.totalAmount;
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
                // console.log(Revenue);
                for (let i = 0; i < 7; i++) {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i);
                    const dayOfWeek = weekdays[date.getDay()];
                    daysArray.unshift(dayOfWeek);

                    if(Revenue[i]) countByDate[dayOfWeek] = Revenue[i].totalAmount;
                    else countByDate[dayOfWeek] = 0 // Initialize the count to 0
                }
                // console.log(countByDate);
                // Loop through the array of Revenue and increment the count for each date
                // Revenue.forEach(ticket => {
                //     console.log(ticket.day);
                //     console.log(ticket.totalAmount);
                //     // const date = new Date(ticket.date);
                //     // console.log(date);
                //     // const dayOfWeek = weekdays[date.getDay()];
                //     // console.log(dayOfWeek);
                //     if (countByDate[ticket.day] !== undefined) {
                //         countByDate[ticket.day]+=ticket.totalAmount;
                //     }
                // });
                // console.log(countByDate);
                // // Loop through the daysArray and populate the countArray with the respective counts
                daysArray.forEach(day => {
                    countArray.push(countByDate[day]);
                });

                // console.log(daysArray);
                // console.log(countArray);

            }

            setSeries([
                {
                    name: slot === 'month' ? 'Revenue Generated' : 'Revenue Generated (Last 7 days)',
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
    }, [slot, Revenue]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
};


BusinessChart.propTypes = {
    slot: PropTypes.string
};

export default BusinessChart;
