import React, { useState, useEffect } from 'react';
import { getAllStudentData, getLowestAttenders, getTop5Behaviors} from '../../api'; 




const LowestAttenders =  () => {

    const [lowestAttenderData,setLowestAttenderData] = useState([])
    const [year,setYear] = useState('2021/22')
 
    const [ClassNumber,setClassNumber] = useState('1A')
    const [term,setTerm] = useState('attendance_autumnTerm')
    const [dropDownAccYears,setDropDownAccYears] = useState([]) 
    const [dropDownYearGroups,setDropDownYearGroups] = useState([]) 
    const [dropDownClass,setDropDownClass] = useState([])
    const [dropDownTerm,setDropDownTerm] = useState(['Autumn Term','Spring Term','Summer Term'])
    const [loading,setLoading] = useState(false)

     useEffect(()=>{

        const fetchLowestAttenders = async ()=>{
            setLoading(true)
            try {
               
                const allData = await getAllStudentData()
                console.log(allData)
                const accYearsArr = allData.map(record=>record.academicYear)
                let setAccYearsArr = new Set(accYearsArr)
                let uniqueAccYears = [...setAccYearsArr]
                uniqueAccYears.sort()
                setDropDownAccYears(uniqueAccYears)
             

         

                const classArr = allData.map(record=>record.Class)
                let setClassArr = new Set(classArr)
                let uniqueClasses = [...setClassArr]
                uniqueClasses.sort()
                setDropDownClass(uniqueClasses)

              
                            
                
                                
                let params = {academicYear:year,Class:ClassNumber,term:term}
                const data = await getLowestAttenders(params)
            
                setLowestAttenderData(data)
               setLoading(false)

            } catch (error) {
                
            }
            
        }

       fetchLowestAttenders()

    },[year,ClassNumber,term]) 

 
    const handleAccYearDropDown = (selectedOption)=>{

        setYear(selectedOption)
    }

   

    const handleClassDropDown = (selectedOption)=>{

        setClassNumber(selectedOption)
    }

    const handleTermDropDown = (selectedOption)=>{

        if(selectedOption==='Autumn Term') setTerm('attendance_autumnTerm')
        if(selectedOption==='Spring Term') setTerm('attendance_springTerm')
        if(selectedOption==='Summer Term') setTerm('attendance_summerTerm')
        
    }


   if (loading){
    return(
       <p className='text-center m-10 text-black font-bold'>Loading</p>
    )
   }

   if(!loading){
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
                  <label htmlFor="Class" className="block text-sm font-medium">
                    Class
                  </label>
                  <select
                    id="Class"
                    value={ClassNumber}
                    onChange={(e) =>
                        handleClassDropDown(e.target.value)
                    }
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {dropDownClass.map((Class) => (
                        <option key={Class} value={Class}>
                        {Class}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="term" className="block text-sm font-medium">
                    Term
                  </label>
                  <select
                    id="term"
                    value={term}
                    onChange={(e) =>
                        handleTermDropDown(e.target.value)
                    }
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {dropDownTerm.map((termcode) => (
                      <option key={termcode} value={termcode}>
                        {termcode}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
        
                {lowestAttenderData.length === 0 && <p className='text-center m-10 text-black font-bold'>No Data</p>}
               
               {lowestAttenderData.map((record)=>{
                    return(
                        <div className="flex flex-col-2 justify-center">
                        <p className="p-3 text-red-600 font-bold ">{record.studentName}</p>
                        <p className="p-3 text-blue-900 font-bold">{record.average} %</p>
                      </div>
                    )
               })}    
              </div>
          
          );

   }
 
};

export default LowestAttenders;
