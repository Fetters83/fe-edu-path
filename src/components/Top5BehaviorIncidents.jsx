import React, { useState, useEffect } from 'react';
 import { getTop5Behaviors } from '../../api'; 




const Top5BehaviorIncidents =  () => {

    const [behaviorData,setBehaviorData] = useState([])
    const [year,setYear] = useState('2021/22')
    const [schoolYear,setSchoolYear] = useState(6)
    const [dropDownAccYears,setDropDownAccYears] = useState([]) 
    const [dropDownYearGroups,setDropDownYearGroups] = useState([]) 
  

     useEffect(()=>{

        const fetchTop5Data = async ()=>{

            try {
                const allData = await getTop5Behaviors()
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
                            
                
                                
                let params = {academicYear:year,yearGroup:schoolYear}
                console.log(params) 
                const data = await getTop5Behaviors( params )
               setBehaviorData(data)

            } catch (error) {
                
            }
            
        }

       fetchTop5Data()

    },[year,schoolYear]) 

 
    const handleAccYearDropDown = (selectedOption)=>{

        setYear(selectedOption)
    }

    const handleYearGroupDropDown = (selectedOption)=>{

        setSchoolYear(selectedOption)
    }
  return (
   
<div className=" h-full w-full">

<div className="flex  justify-center gap-4 mb-4 ">
        <div>
          <label htmlFor="academicYear" className="block text-sm font-medium">
            Academic Year
          </label>
          <select
            id="academicYear"
            value={year}
            onChange={(e) =>
                handleAccYearDropDown(e.target.value)
            }
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {dropDownAccYears.map((year) => (
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
        </div>
      </div>

       {behaviorData.map((record)=>{
            return(
                <div className="flex flex-col-2 justify-center">
                <p className="p-3 text-red-600 font-bold ">{record.subcategory}</p>
                <p className="p-3 text-blue-900 font-bold">{record.incidentCount}</p>
              </div>
            )
       })}    
      </div>
  
  );
};

export default Top5BehaviorIncidents;
