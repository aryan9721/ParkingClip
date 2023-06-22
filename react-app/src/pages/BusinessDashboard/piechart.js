import React from 'react'
import ReactApexChart from 'react-apexcharts';
const piechart = () => {
    const series = [44, 55, 41, 17, 15];
    const chartOptions = {
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    }
    
    return (
        <div id="chart">
            <ReactApexChart options={chartOptions} series={series} type="pie" width={380} />
        </div>

    )
}

export default piechart