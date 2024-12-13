import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getBehaviorLogs } from "../../api"; 

const BehaviorLogsTable = () => {
  const [behaviorLogs, setBehaviorLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBehaviorLogs = async () => {
      try {
        const data = await getBehaviorLogs(); 
        setBehaviorLogs(data);
        setFilteredLogs(data); 
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch behavior logs");
        setLoading(false);
      }
    };

    fetchBehaviorLogs();
  }, []);

  useEffect(() => {
    const filteredData = behaviorLogs.filter((log) => {
      const searchString = search.toLowerCase();
      return (
        log.behaviorLogId.toString().includes(searchString) ||
        log.studentId.toString().includes(searchString) ||
        log.yearGroup.toString().includes(searchString) ||
        log.academicYear.toLowerCase().includes(searchString) ||
        log.primaryCategory.toLowerCase().includes(searchString) ||
        log.subcategory.toLowerCase().includes(searchString) ||
        log.severity.toLowerCase().includes(searchString) ||
        log.details.toLowerCase().includes(searchString) ||
        (log.status || "Pending").toLowerCase().includes(searchString)
      );
    });
    setFilteredLogs(filteredData);
  }, [search, behaviorLogs]);

  const columns = [
    {
      name: "Behavior Log ID",
      selector: (row) => row.behaviorLogId,
      sortable: true,
    },
    {
      name: "Student ID",
      selector: (row) => row.studentId,
      sortable: true,
    },
    {
      name: "Year Group",
      selector: (row) => row.yearGroup,
      sortable: true,
    },
    {
      name: "Academic Year",
      selector: (row) => row.academicYear,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
    },
    {
      name: "Primary Category",
      selector: (row) => row.primaryCategory,
    },
    {
      name: "Subcategory",
      selector: (row) => row.subcategory,
    },
    {
      name: "Severity",
      selector: (row) => row.severity,
    },
    {
      name: "Details",
      selector: (row) => row.details,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => row.status || "Pending",
    },
    {
      name: "Date Resolved",
      selector: (row) =>
        row.dateResolved
          ? new Date(row.dateResolved).toLocaleDateString()
          : "Not Resolved",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Behavior Logs</h1>

  
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by any field..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredLogs} 
        pagination
        className="bg-gray-50"
        customStyles={{
          headRow: {
            style: {
              backgroundColor: "#f9fafb",
              borderBottom: "1px solid #e5e7eb",
            },
          },
          rows: {
            style: {
              borderBottom: "1px solid #e5e7eb",
            },
          },
        }}
      />
    </div>
  );
};

export default BehaviorLogsTable;
