import NavBar from "./StudentNavbar";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import { Link } from "react-router-dom";

const StudentProfile = () => {
  const [student, setStudent] = useState({});

  const getProfileData = async () => {
    const token = Cookies.get("token");
    const url = `${process.env.REACT_APP_API_URL}/api/student/profile/`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setStudent(data);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const ProfileView = () => {
    return (
      <div className="flex flex-col items-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <img
          src={student.profileUrl}
          alt={`${student.name}'s profile`}
          className="w-32 h-32 rounded-full shadow-lg mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
        <p className="text-sm text-gray-500 mt-1 mb-4">{student.role}</p>

        <div className="w-full space-y-4 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Department:</span>
            <span className="text-gray-800">{student.department}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Roll No:</span>
            <span className="text-gray-800">{student.rollNo}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Phone No:</span>
            <span className="text-gray-800">{student.phoneNo}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-800">{student.email}</span>
          </div>

          <div className="mt-6">
            <Link to="/student-history">
              <h2 className=" hover:text-blue-700 hover:underline text-lg font-semibold text-gray-700 mb-2">
                Requests
              </h2>
            </Link>

            {student.requests && student.requests.length > 0 ? (
              <p>No of Requests : {student.requests.length}</p>
            ) : (
              <p>No requests yet</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <NavBar />

      {student.name ? (
        <ProfileView />
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default StudentProfile;
