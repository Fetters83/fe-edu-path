import React from "react";
import DataTable from "react-data-table-component";

const ManageStudents = () => {
  const data = [
    { id: 1, name: "Alice", age: 20, grade: "A" },
    { id: 2, name: "Bob", age: 22, grade: "B" },
    { id: 3, name: "Charlie", age: 21, grade: "C" },
  ];

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Grade",
      selector: (row) => row.grade,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleView(row)}
            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
          >
            View
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    alert(`Edit ${row.name}`);
  };

  const handleView = (row) => {
    alert(`View ${row.name}`);
  };

  const handleDelete = (row) => {
    alert(`Delete ${row.name}`);
  };

  return (
    <div className="flex-1 p-4">
  <div className="p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>
      <DataTable
        columns={columns}
        data={data}
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
    </div>
  
  );
};

export default ManageStudents;
