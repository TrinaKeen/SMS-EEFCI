"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

// Define the type for the form data
interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: string;
  age: string;
  nationality: string;
  placeOfBirth: string;
  email: string;
  phoneNumber: string;
  homeAddress: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
  emergencyContactRelationship: string;
  previousSchools: string;
  yearOfGraduation: string;
  gpa: string;
  programId: string;
}

const CreateStudentApplicationForm = () => {
  // Initialize state with the form data
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    age: "",
    nationality: "",
    placeOfBirth: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    emergencyContactName: "",
    emergencyContactPhoneNumber: "",
    emergencyContactRelationship: "",
    previousSchools: "",
    yearOfGraduation: "",
    gpa: "",
    programId: "",
  });

  // Handle input field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/studentApplications", formData);
      alert("Student application created successfully");
    } catch (error) {
      console.error("Error creating student application", error);
      alert("Error creating student application");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border p-2"
        />
      </div>
      <div>
        <label className="block">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border p-2"
        />
      </div>
      {/* Add other form fields as needed */}

      <div>
        <label className="block">Program ID</label>
        <input
          type="text"
          name="programId"
          value={formData.programId}
          onChange={handleChange}
          className="w-full border p-2"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Submit Application
      </button>
    </form>
  );
};

export default CreateStudentApplicationForm;
