import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Sidebar from "./components/SideBar";
import ManageStudents from "./components/ManageStudents";
import BehaviorVisuals from "./components/BehaviourVisuals";
import HomePage from "./components/HomePage";
import AcademicVisuals from "./components/AcademicVisuals";
import GradeDistributionVisuals from "./components/GradeDistributionVisuals";
import StudentDetail from "./components/StudentDetails";
import EditStudent from "./components/EditStudent";
import BehaviorLogsTable from "./components/BehaviorLogsTable";
import SuggestionsTable from "./components/SuggestionsTable";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
  
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students" element={<ManageStudents />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/students/:id/edit" element={<EditStudent />} />
        <Route path="/insights/academic" element={<AcademicVisuals />} />
        <Route path="/insights/behavior" element={<BehaviorVisuals />} />
        <Route path="/insights/grades" element={<GradeDistributionVisuals/>} />
        <Route path="/behavior-logs" element={<BehaviorLogsTable />} />
        <Route path="/suggestions" element={<SuggestionsTable />} />
      </Routes>
    </div>
  );
}

export default App;
