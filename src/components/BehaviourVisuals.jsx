import BehaviorIncidentsChart from "./BehaviorIncidentChart"
import ResolutionRateChart from "./ResolutionRateChart";
import Top5BehaviorIncidents from "./Top5BehaviorIncidents";

const BehaviorVisuals = ()=>{

 

        return (
          <div className="flex-1 p-4 bg-gray-100 min-h-0">
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
              <div className="bg-white p-4 shadow rounded">
              <h2 className="text-xl font-semibold mb-2 text-center">Behavior Incident by Year and Severity</h2>
              <div className="flex-1 bg-gray-200 flex items-center justify-center overflow-hidden p-1">
                <BehaviorIncidentsChart />
              </div>
            </div>
      

            <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2 text-center">Resolution Rates</h2>
              <div className="flex-1 bg-gray-200 flex items-center justify-center">
               <ResolutionRateChart/>
              </div>
            </div>
      
           
            <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2 text-center">Top 5 Behavior Incidents</h2>
              <div className="flex-1 bg-gray-200 flex items-center justify-center">
               <Top5BehaviorIncidents/> 
              </div>
            </div>
          </div>
          </div>
       
        );
      };
    


export default BehaviorVisuals