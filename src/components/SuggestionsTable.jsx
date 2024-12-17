import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getSuggestions } from "../../api"; 

const SuggestionsTable = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        //fetch results from function getSuggestions
        const data = await getSuggestions(); 
        //store suggestions against the state variable suggestions
        setSuggestions(data);
        //also store the suggestions against the state variable filteredSuggestions for use in the filter
        setFilteredSuggestions(data); 
        //now the db operation is completed - set the loading state variable to false - conditional html will not longer render 'loading' on the page
        setLoading(false);
      } catch (err) {
        //on failure set the error state variable to the below string
        setError("Failed to fetch suggestions");
        // after error set the loading state variable to false - conditional html will not longer render 'loading' on the page
        setLoading(false);
      }
    };

    //run the async function fetchSuggestions once on page render 
    fetchSuggestions();
  }, []);

  useEffect(() => {
    const filteredData = suggestions.filter((suggestion) => {
      const searchString = search.toLowerCase();
      return (
        suggestion.suggestionId.toString().includes(searchString) ||
        suggestion.studentId.toString().includes(searchString) ||
        suggestion.academicYear.toLowerCase().includes(searchString) ||
        new Date(suggestion.date).toLocaleDateString().includes(searchString) ||
        suggestion.behaviorLogId.toString().includes(searchString) ||
        suggestion.suggestion.toLowerCase().includes(searchString) ||
        (suggestion.followUpRequired ? "Yes" : "No")
          .toLowerCase()
          .includes(searchString)
      );
    });
    setFilteredSuggestions(filteredData);
  }, [search, suggestions]);

  const columns = [
    {
      name: "Suggestion ID",
      selector: (row) => row.suggestionId,
      sortable: true,
    },
    {
      name: "Student ID",
      selector: (row) => row.studentId,
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
      name: "Behavior Log ID",
      selector: (row) => row.behaviorLogId,
    },
    {
      name: "Suggestion",
      selector: (row) => row.suggestion,
      wrap: true,
    },
    {
      name: "Follow Up Required",
      selector: (row) => (row.followUpRequired ? "Yes" : "No"),
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
      <h1 className="text-2xl font-bold mb-4">Suggestions</h1>


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
        data={filteredSuggestions} 
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

export default SuggestionsTable;
