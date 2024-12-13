import GradeDistrubutionKS1Chart from "./gradeDistributionKS1";
import GradeDistrubutionKS2Chart from "./gradeDistributionKS2";

const GradeDistributionVisuals = () => {
    return (
      <div className="flex-1 p-4 bg-gray-100 min-h-0 max-w-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Chart 1 */}
          <div className="bg-white p-4 shadow rounded flex flex-col">
            <h2 className="text-xl font-semibold mb-2 text-center">KS1 Grades</h2>
            <div className="flex-1 flex items-center justify-center">
              <GradeDistrubutionKS1Chart />
            </div>
          </div>
  
          {/* Chart 2 */}
          <div className="bg-white p-4 shadow rounded flex flex-col">
            <h2 className="text-xl font-semibold mb-2 text-center">KS2 Grades</h2>
            <div className="flex-1 flex items-center justify-center">
              <GradeDistrubutionKS2Chart />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
 

  export default GradeDistributionVisuals