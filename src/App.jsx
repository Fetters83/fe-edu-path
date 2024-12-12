import React from "react";
import { Routes, Route } from "react-router";

import Sidebar from './components/SideBar'

import ManageStudents from "./components/ManageStudents";
import BehaviorVisuals from "./components/BehaviourVisuals";
import HomePage from "./components/HomePage";
import AcademicVisuals from "./components/AcademicVisuals";

function App() {


  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/students" element={<ManageStudents/>}/>
        <Route path="/insights/academic" element={<AcademicVisuals/>}/>
        <Route path="/insights/behavior" element={<BehaviorVisuals/>}/>
      </Routes>     
    </div>
  );
}

export default App
