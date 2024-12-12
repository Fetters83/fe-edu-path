import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'; // Example chart library
import { getBehaviorIncidents } from '../../api';

const IncidentChart = () => {
  // State for chart data
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    const fetchIncidentData = async () => {
      try {
        // Fetch data from the API
        const responseBody = await getBehaviorIncidents();

        // Transform the data for the chart
        const groupedData = {};
        responseBody.forEach((entry) => {
          const { academicYear, severity, incidentCount } = entry;
          if (!groupedData[severity]) {
            groupedData[severity] = {};
          }
          if (!groupedData[severity][academicYear]) {
            groupedData[severity][academicYear] = 0;
          }
          groupedData[severity][academicYear] += incidentCount;
        });

        // Prepare categories (distinct academic years)
        const uniqueCategories = Array.from(
          new Set(responseBody.map((entry) => entry.academicYear))
        ).sort();
        setCategories(uniqueCategories);

        // Prepare series data
        const transformedSeries = Object.keys(groupedData).map((severity) => ({
          name: severity,
          data: uniqueCategories.map(
            (year) => groupedData[severity][year] || 0
          ),
        }));
        setSeries(transformedSeries);

        setLoading(false); // Set loading to false when data is ready
      } catch (err) {
        setError('Failed to fetch data'); // Set error message
        setLoading(false); // Stop loading spinner
      }
    };

    fetchIncidentData();
  }, []); // Run only once on component mount

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900,
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    title: {
      text: 'Incident Counts by Severity and Year',
    },
    xaxis: {
      categories: categories, // Dynamic categories from state
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " Incidents";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };

 

  // Show a loading spinner or error message if necessary
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Render the chart with series as a prop
  return (
    <div className='h-full w-full'>
      <Chart options={options} series={series} type="bar" width="100%"  />
    </div>
  );
};

export default IncidentChart;
