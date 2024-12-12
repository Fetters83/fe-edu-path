import React from "react";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white  flex flex-col">
      <div className="p-4 text-2xl font-bold">EduPath</div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <div className="bg-white text-gray-800 font-bold border-s-gray-700">
            <h2 className="block px-4 py-2">Students</h2>
            </div>
            <Link to={'/students'} className="block px-4 py-4 hover:bg-gray-700" >Manage Students</Link>
           {/*  */}
          </li>
          <li>
            <a href="#" className="block px-4 py-4 hover:bg-gray-700">
              Add Student
            </a>
          </li>
          <div className="bg-white text-gray-800 font-bold">
            <h2 className="block px-4 py-2">Behaviors</h2>
            </div>
          <li>
            <a href="#" className="block px-4 py-4 hover:bg-gray-700">
              View Behavior Logs
            </a>
          </li>
         <div className="bg-white text-gray-800 font-bold">
            <h2 className="block px-4 py-2">Suggestions</h2>
            </div>
          <li>
            <a href="#" className="block px-4 py-4 hover:bg-gray-700">
              View Suggestions
            </a>
          </li>
          <div className="bg-white text-gray-800 font-bold">
            <h2 className="block px-4 py-2">Metrics</h2>
            </div>
          <li>
           <Link to={'/insights/academic'} className="block px-4 py-4 hover:bg-gray-700" >Attendance</Link>
          </li>
          <li>
          <Link to={'/insights/behavior'} className="block px-4 py-4 hover:bg-gray-700" >Behavior</Link>
          </li>
          <li>
            <a href="#" className="block px-4 py-4 hover:bg-gray-700">
             Engagement
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;