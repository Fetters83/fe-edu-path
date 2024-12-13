import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'; 
import { getBehaviorIncidents } from '../../api';

const IncidentChart = () => {

  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchIncidentData = async () => {
      try {
    
        const responseBody = await getBehaviorIncidents();

    
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

     
        const uniqueCategories = Array.from(
          new Set(responseBody.map((entry) => entry.academicYear))
        ).sort();
        setCategories(uniqueCategories);

     
        const transformedSeries = Object.keys(groupedData).map((severity) => ({
          name: severity,
          data: uniqueCategories.map(
            (year) => groupedData[severity][year] || 0
          ),
        }));
        setSeries(transformedSeries);

        setLoading(false); 
      } catch (err) {
        setError('Failed to fetch data'); 
        setLoading(false); 
      }
    };

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
