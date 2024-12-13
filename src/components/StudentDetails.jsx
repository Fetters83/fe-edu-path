import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../api"; 

const StudentDetail = () => {
  const { id } = useParams(); 
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const studentData = await getStudentById(id); 
        setStudent(studentData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch student details");
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex-1 p-4">
      <div className="p-4 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">
          {student.firstName} {student.lastName}
        </h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <tbody>
            {Object.entries(student).map(([key, value]) => (
              <tr key={key} className="border-b border-gray-300">
                <td className="px-4 py-2 font-semibold">{key}</td>
                <td className="px-4 py-2">{value ? value : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetail;
