import React from "react";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <section className="w-64 p-4 bg-gray-600">
    <section className="flex justify-evenly">
      <nav className="flex-1">
      <ul className="space-y-2 p-0 m-0">
            <li className="p-4 m-3 text-white font-bold text-2xl">
                <h1 >EduPath</h1>
            </li>
            <li className="p-0 m-0 text-gray-600 text-xl font-bold bg-white text-center">
                <h1>Students</h1>
            </li>
            <li className="p-4 m-3 text-white font-bold">
            <Link to={'/students'} className="block py-2 " >Manage Students</Link>
            </li>
            <li className="p-0 m-0 text-gray-600 text-xl font-bold bg-white text-center">
                <h1>Behavior</h1>
            </li>
            <li className="p-4 m-3 text-white font-bold">
            <Link to={'/behavior-logs'} className="block py-2 " >Behavior Logs</Link>
            </li>
            <li className="p-0 m-0 text-gray-600 text-xl font-bold bg-white text-center">
                <h1>Suggestions</h1>
            </li>
            <li className="p-4 m-3 text-white font-bold">
            <Link to={'/suggestions'} className="block py-2 " >Suggestion Logs</Link>
            </li>
            <li className="p-0 m-0 text-gray-600 text-xl font-bold bg-white text-center">
                <h1>Insights</h1>
            </li>
            <li className="p-4 m-3 text-white font-bold">
            <Link to={'/insights/academic'} className="block py-2 " >Academic</Link>
            </li> 
            <li className="p-4 m-3 text-white font-bold">
            <Link to={'/insights/behavior'} className="block py-2 " >Behavior</Link>
            </li>
            <li className="p-4 m-3 text-white font-bold">
            <Link to={'/insights/grades'} className="block py-2 " >Grades</Link>
            </li> 
       
        </ul>
      </nav>
    
    </section>

</section>
  );
};

export default Sidebar;