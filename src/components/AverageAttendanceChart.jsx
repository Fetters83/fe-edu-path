import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getAverageAttendance } from "../../api";

function AverageAttendanceChart() {
  const [chartData, setChartData] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);

  useEffect(() => {
    const fetchAverageAttendance = async () => {
      try {
        const response = await getAverageAttendance();
        setChartData(response);

        const xArray = response.map((x) => x.academicYear);
        setXAxis(xArray);

        const yArray = response.map((y) => y.averageAttendance);
        setYAxis(yArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAverageAttendance();
  }, []);

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: xAxis.length > 0 ? xAxis : ["Loading..."], // Default placeholder
    },
  };

  const series = [
    {
      name: "Average Attendance",
      data: yAxis.length > 0 ? yAxis : [0], // Default placeholder
    },
  ];

  return (
    <div className="w-full h-full overflow-hidden">
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
