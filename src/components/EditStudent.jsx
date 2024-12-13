import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editStudentById, getStudentById } from "../../api";

const EditStudent = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [errors, setErrors] = useState({});
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "parentContactPhone" ? String(value) : value;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "academicYear",
      "firstName",
      "lastName",
      "dateOfBirth",
      "yearGroup",
      "Class",
      "keyStage",
    ];

    requiredFields.forEach((field) => {
      if (!student[field]) newErrors[field] = "This field is required";
    });


    if (student.yearGroup < 1 || student.yearGroup > 6)
      newErrors.yearGroup = "Year group must be between 1 and 6";
    if (!["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B", "6A", "6B"].includes(student.Class))
      newErrors.Class = "Class must be 1A-6B";
    if (!["KS1", "KS2"].includes(student.keyStage))
      newErrors.keyStage = "Key stage must be KS1 or KS2";
    if (!["WES", "BES"].includes(student.phonicsCheckResult))
      newErrors.phonicsCheckResult = "Phonics check result must be WES or BES";
    if (student.ks1ReadingScore < 85 || student.ks1ReadingScore > 115)
      newErrors.ks1ReadingScore = "KS1 Reading Score must be between 85 and 115";
    if (student.attendance_autumnTerm < 0 || student.attendance_autumnTerm > 100)
      newErrors.attendance_autumnTerm = "Attendance must be between 0 and 100";

   

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await editStudentById(id, student);
      navigate("/students"); 
    } catch (err) {
      setError("Failed to update student details");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex-1 p-4">
      <div className="p-4 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Edit Student</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  
            {Object.entries(student).map(([key, value]) => {
   
              if (["_id"].includes(key)) return null;

       
              if (key === "keyStage") {
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium capitalize">
                      {key}
                    </label>
                    <select
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-2 px-3 border rounded-md"
                    >
                      <option value="">Select Key Stage</option>
                      <option value="KS1">KS1</option>
                      <option value="KS2">KS2</option>
                    </select>
                    {errors[key] && (
                      <p className="text-red-500 text-sm">{errors[key]}</p>
                    )}
                  </div>
                );
              }

              
                if(key === "parentContactPhone"){
                    <div key={key}>
                    <label className="block text-sm font-medium capitalize">
                      {key}
                    </label>
                    <input
                      type="text" 
                      name={key}
                      value={student[key] || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-2 px-3 border rounded-md"
                    />
                    {errors[key] && (
                      <p className="text-red-500 text-sm">{errors[key]}</p>
                    )}
                  </div>
                }
               
            

              if (key === "phonicsCheckResult") {
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium capitalize">
                      {key}
                    </label>
                    <select
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-2 px-3 border rounded-md"
                    >
                      <option value="">Select Phonics Result</option>
                      <option value="WES">WES</option>
                      <option value="BES">BES</option>
                    </select>
                    {errors[key] && (
                      <p className="text-red-500 text-sm">{errors[key]}</p>
                    )}
                  </div>
                );
              }

        
              return (
                <div key={key}>
                  <label className="block text-sm font-medium capitalize">
                    {key}
                  </label>
                  <input
                    type={
                      typeof value === "number" 
                        ? "number"
                        : key === "dateOfBirth"
                        ? "date"
                        : "text"
                    }
                    name={key}
                    value={value || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-2 px-3 border rounded-md"
                  />
                  {errors[key] && (
                    <p className="text-red-500 text-sm">{errors[key]}</p>
                  )}
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/students")}
            className="mt-4 ml-2 bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
