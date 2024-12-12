import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const ResolutionRateChart = () => {
  const [academicYears, setAcademicYears] = useState(["2021/22", "2020/21","2019/20"]); // Example dropdown options
  const [yearGroups, setYearGroups] = useState([6, 5, 4,3,2,1]); // Example dropdown options
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("2021/22");
  const [selectedYearGroup, setSelectedYearGroup] = useState(6);
  const [resolutionRate, setResolutionRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial data based on default dropdown values
    fetchResolutionRate(selectedAcademicYear, selectedYearGroup);
  }, []);

  const fetchResolutionRate = async (academicYear, yearGroup) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://be-edu-path.onrender.com/api/behavioralMetrics/resolutionRate",
        {
          params: {
            academicYear,
            yearGroup,
          },
        }
      );

      const data = response.data;

      // Update state with the returned values
      setResolutionRate(data.resolutionRate);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const handleFilterChange = (newAcademicYear, newYearGroup) => {
    setSelectedAcademicYear(newAcademicYear);
    setSelectedYearGroup(newYearGroup);
    fetchResolutionRate(newAcademicYear, newYearGroup);
  };

  const chartOptions = {
    labels: ["Resolved", "Unresolved"],
    colors: ["#4CAF50", "#F44336"],
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chartSeries = [resolutionRate, 100 - resolutionRate];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">
        Resolution Rate for {selectedAcademicYear}, Year Group {selectedYearGroup}
      </h2>

      {/* Dropdowns */}
      <div className="flex gap-4 mb-4">
        <div>
          <label htmlFor="academicYear" className="block text-sm font-medium">
            Academic Year
          </label>
          <select
            id="academicYear"
            value={selectedAcademicYear}
            onChange={(e) =>
              handleFilterChange(e.target.value, selectedYearGroup)
            }
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="yearGroup" className="block text-sm font-medium">
            Year Group
          </label>
          <select
            id="yearGroup"
            value={selectedYearGroup}
            onChange={(e) =>
              handleFilterChange(selectedAcademicYear, e.target.value)
            }
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {yearGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="pie"
        width="100%"
        height="350px"
      />
    </div>
  );
};

export default ResolutionRateChart;
