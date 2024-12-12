import AverageAttendanceChart from "./AverageAttendanceChart";
import LowestAttenders from "./LowestAttenders";



const AcademicVisuals = ()=>{

 

    return (
      <div className="flex-1 p-4 bg-gray-100 min-h-0">
   <div className="grid grid-cols-1 md:grid-cols-1 gap-4 overflow-hidden">
          <div className="bg-white p-4 shadow rounded overflow-hidden h-full">
          <h2 className="text-xl font-semibold mb-2 text-center">Average Attendance</h2>
          <div className="flex-1 bg-gray-200 flex items-center justify-center overflow-hidden p-1 h-full">
           <AverageAttendanceChart/>
          </div>
        </div>
  

        <div className="bg-white p-4 shadow rounded overflow-hidden">
        <h2 className="text-xl font-semibold mb-2 text-center">Lowest 5 Attenders</h2>
          <div className="flex-1 bg-gray-200 flex items-center justify-center">
           <LowestAttenders/>
          </div>
        </div>
  
       
      </div>
        </div>
   
    );
  };



export default AcademicVisuals