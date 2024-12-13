import { useEffect, useState } from "react";
import { getAllStudentData, getKS1GradeDistributionData } from "../../api";
import Chart from 'react-apexcharts'; 

const GradeDistrubutionKS1Chart = () => {

 
    const [series, setSeries] = useState([])
    const [year,setYear] = useState('2021/22')
    const [schoolYear,setSchoolYear] = useState(6)
    const [dropDownYearGroups,setDropDownYearGroups] = useState([])
    const [dropDownAccYears,setDropDownAccYears] = useState([])
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 
  
  
    useEffect(() => {

        try {

            const fetchKS1GradeDistributionData = async()=>{
                const allData = await getAllStudentData()
                const accYearsArr = allData.map(record=>record.academicYear)
                let setAccYearsArr = new Set(accYearsArr)
                let uniqueAccYears = [...setAccYearsArr]
                uniqueAccYears.sort()
                setDropDownAccYears(uniqueAccYears)
          

                const yearGroupArr = allData.map(record=>record.yearGroup)
                let setYearGroupArr = new Set(yearGroupArr)
                let uniqueYearGroups = [...setYearGroupArr]
                uniqueYearGroups.sort()
                setDropDownYearGroups(uniqueYearGroups)
               
                const grades = ["ReadingBESCount","ReadingWESCount","MathsBESCount","MathsWESCount","GpsBESCount","GpsWESCount"]

               
                let seriesData = []
                let seriesArr = []

                for(let i =0; i<grades.length;i++){
                    for(let i = 0 ;i<uniqueAccYears.length;i++){
                        const uniqueYear = uniqueAccYears[i]
                        const data = await getKS1GradeDistributionData({academicYear:uniqueYear,yearGroup:schoolYear})
                       seriesData.push(data[grades[i]])
                        
                    }
                    seriesArr.push({name:grades[i],data:seriesData})
                    seriesData=[]

                }

      
               
                setSeries(seriesArr)

            }
            fetchKS1GradeDistributionData()
            
        } catch (error) {
            
        }
       
    }, [schoolYear]); 

     


    const handleYearGroupDropDown = (selectedOption)=>{

        setSchoolYear(selectedOption)
    }
  
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
        text: 'KS1 Grades by year and year group',
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
                <div>
          <label htmlFor="yearGroup" className="block text-sm font-medium">
            Year Group
          </label>
          <select
            id="yearGroup"
            value={schoolYear}
            onChange={(e) =>
                handleYearGroupDropDown(e.target.value)
            }
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {dropDownYearGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div >
        <div className="w-full h-[500px] overflow-hidden">
        <div className="flex-1 flex items-center justify-center h-full">
        <Chart options={options} series={series} type="bar" width="500"  />
        </div>
        </div>
     
      </div>
    ); 

  };
  
  export default GradeDistrubutionKS1Chart;