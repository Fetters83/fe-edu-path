import { useEffect, useState } from "react";
import { getAllStudentData, getKS2GradeDistributionData } from "../../api";
import Chart from 'react-apexcharts'; 

const GradeDistrubutionKS2Chart = () => {

 
    const [series, setSeries] = useState([])
    const [year,setYear] = useState('2021/22')
    const [schoolYear,setSchoolYear] = useState(6)
    const [dropDownYearGroups,setDropDownYearGroups] = useState([])
    const [dropDownAccYears,setDropDownAccYears] = useState([])
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 
  
  
    useEffect(() => {

        try {

            const fetchKS2GradeDistributionData = async()=>{
                const allData = await getAllStudentData()
                const accYearsArr = allData.map(record=>record.academicYear)
                let setAccYearsArr = new Set(accYearsArr)
                let uniqueAccYears = [...setAccYearsArr]
                uniqueAccYears.sort()
                setDropDownAccYears(uniqueAccYears)
                console.log(dropDownAccYears)
          

               
                const grades = [
                    "ReadingGDSCount",
                    "ReadingEXSCount",
                    "ReadingWTCount",
                    "MathsGDSCount",
                    "MathsEXSCount",
                    "MathsWTCount",
                    "GpsGDSCount",
                    "GpsEXSCount",
                    "GpsWTCount",
                    "scienceGDSCount",
                    "scienceEXSCount",
                    "scienceWTCOunt"
                ]

               
                let seriesData = []
                let seriesArr = []

                for(let i =0; i<grades.length;i++){
                    for(let i = 0 ;i<uniqueAccYears.length;i++){
                        const uniqueYear = uniqueAccYears[i]
                        const data = await getKS2GradeDistributionData({academicYear:uniqueYear})
                        console.log(data)
                       seriesData.push(data[grades[i]])
                        
                    }
                    seriesArr.push({name:grades[i],data:seriesData})
                    seriesData=[]

                }

      
               
                setSeries(seriesArr)
                console.log(series)

            }
            fetchKS2GradeDistributionData()
            
        } catch (error) {
            
        }
       
    }, [schoolYear]); 

     
     
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
        text: 'KS2 Grades by year and year group',
      },
      xaxis: {
        categories: dropDownAccYears, 
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " Score";
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
    <div className="w-full h-[500px] overflow-hidden">
        <div className="flex-1 flex items-center justify-center h-full">
        <Chart options={options} series={series} type="bar" width="600"  />
        </div>
       
      </div>
    ); 

  };
  
  export default GradeDistrubutionKS2Chart;