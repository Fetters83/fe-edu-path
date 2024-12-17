import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'; 
import { getBehaviorIncidents } from '../../api';

const IncidentChart = () => {

  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  //render fetch of api behavior incident data
  useEffect(() => {
    const fetchIncidentData = async () => {
      try {
        //fetch data
        const response = await getBehaviorIncidents();

        //create empty object for grouped data
        const groupedData = {};
        //loop through each object from the result and count records against all academic years and severities
        response.forEach((entry) => {
          const { academicYear, severity, incidentCount } = entry;
          if (!groupedData[severity]) {
            groupedData[severity] = {};
          }
          if (!groupedData[severity][academicYear]) {
            groupedData[severity][academicYear] = 0;
          }
          groupedData[severity][academicYear] += incidentCount;
        });

        
        //create new array for unique categories
        const uniqueCategories = Array.from(
          //remove duplicates of academic year and sort
          new Set(response.map((entry) => entry.academicYear))
        ).sort();
        //set the state of unique categories
        setCategories(uniqueCategories);
        

     //map through objects in the grouped data
        const transformedSeries = Object.keys(groupedData).map((severity) => ({
          //set key as name of severity in the iteration
          name: severity,
          //map through the uniqueCategories to set the data array for the severity and the year
          data: uniqueCategories.map(
            (year) => groupedData[severity][year] || 0
          ),
        }));
        //set the series needed for the chart
        setSeries(transformedSeries);

        //set loading to false
        setLoading(false); 
      } catch (err) {
        setError('Failed to fetch data'); 
        setLoading(false); 
      }
    };
    //run the function
    fetchIncidentData();
  }, []); 

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
      categories: categories, 
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

 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div className='h-full w-full'>
      <Chart options={options} series={series} type="bar" width="100%"  />
    </div>
  );
};

export default IncidentChart;
