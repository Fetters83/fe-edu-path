import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getAverageAttendance } from "../../api";

function AverageAttendanceChart() {
  const [chartData, setChartData] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);

  //render fetch of api average attendance data
  useEffect(() => {
    const fetchAverageAttendance = async () => {
      try {

        //set chartData
        const response = await getAverageAttendance();
        setChartData(response);
        //set values for x axis
        const xArray = response.map((x) => x.academicYear);
        setXAxis(xArray);
        //set values for y axis
        const yArray = response.map((y) => y.averageAttendance);
        setYAxis(yArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    //execute function
    fetchAverageAttendance();
  }, []);

  //set apex chart options
  const options = {
    chart: {
      id: "basic-bar",
    },
    //if data has not rendered yet, set x axis labels to 'loading...'
    xaxis: {
      categories: xAxis.length > 0 ? xAxis : ["Loading..."], 
    },
  };
  //set y axis data and number to the data fetched for the y axis
  const series = [
    {
      name: "Average Attendance",
      data: yAxis.length > 0 ? yAxis : [0], 
    },
  ];

  return (
    <div className="w-full h-[400px] overflow-hidden">
      {xAxis.length > 0 && yAxis.length > 0 ? (
        <div className="w-full h-full">
          <Chart options={options} series={series} type="bar" width="100%" height="100%" />
        </div>
      ) : (
        <p className="text-gray-500">Loading data...</p>
      )}
    </div>
  );
}

export default AverageAttendanceChart;
