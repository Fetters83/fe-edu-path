import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { getAllStudentData } from "../../api";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentData = await getAllStudentData();
        setStudents(studentData);
        setFilteredStudents(studentData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch student data");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const filteredData = students.filter((student) => {
      const searchString = search.toLowerCase();
      return (
        student.studentId.toString().includes(searchString) ||
        `${student.firstName} ${student.lastName}`
          .toLowerCase()
          .includes(searchString) ||
        student.yearGroup.toString().includes(searchString) ||
        student.Class.toLowerCase().includes(searchString) ||
        student.parentContactName.toLowerCase().includes(searchString)
      );
    });
    setFilteredStudents(filteredData);
  }, [search, students]);

  const handleView = (row) => {
    navigate(`/students/${row.studentId}`); 
  };

  const handleEdit = (row) => {
    navigate(`/students/${row.studentId}/edit`); 
  };

  const columns = [
    {
      name: "Student ID",
      selector: (row) => row.studentId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    {
      name: "Year Group",
      selector: (row) => row.yearGroup,
      sortable: true,
    },
    {
      name: "Class",
      selector: (row) => row.Class,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(row)}
            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
          >
            View
          </button>
    
        </div>
      ),
    },
  ];

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex-1 p-4">
      <div className="p-4 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Manage Students</h1>


        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Name, ID, Year Group, Class, or Parent Contact"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredStudents}
          pagination
          className="bg-gray-50"
        />
      </div>
    </div>
  );
};

export default ManageStudents;

