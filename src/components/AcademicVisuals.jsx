import AverageAttendanceChart from "./AverageAttendanceChart";
import LowestAttenders from "./LowestAttenders";



const AcademicVisuals = () => {
  return (
    <div className="flex-1 p-4 bg-gray-100 min-h-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
        <div className="bg-white p-4 shadow rounded flex flex-col md:col-span-2">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Average Attendance
          </h2>
          <div className="flex-1 flex items-center justify-center">
            <AverageAttendanceChart />
          </div>
        </div>

  
        <div className="bg-white p-4 shadow rounded flex flex-col md:col-span-2">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Lowest 5 Attenders
          </h2>
          <div className="flex-1 flex items-center justify-center">
            <LowestAttenders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicVisuals;
