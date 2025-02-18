import React from "react";
import FacultyNavbar from "./FacultyNavbar";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

import { StatusType } from "../../constants/StatusTypes";

const FacultyProfile = () => {
  const [facultyDetails, setFacultyDetails] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getFaculty();
  }, []);

  const getFaculty = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/faculty/profile/`;
      console.log(url);
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFacultyDetails(data);
      } else {
        const data = await response.json();
        console.log(data);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickStudents = () => {
    console.log("Students clicked");
    navigate("/faculty-students");
  };

  const arePendingRequests = (requests) => {
    let count = 0;
    requests.forEach((request) => {
      if (request.status === StatusType.PENDING) {
        count++;
      }
    });
    return count;
  };

  

  return (
    <div>
      <FacultyNavbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        {/* Faculty Navbar */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {(facultyDetails && facultyDetails.name ) ||
              "Faculty Name"}
          </h2>
          <p className="text-gray-600">
            Department: {facultyDetails.department || "Department Name"}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-lg font-semibold">
              {facultyDetails.phoneNo || "Phone Number"}
            </p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">
              {facultyDetails.email || "Email Address"}
            </p>
          </div>
        </div>

        {/* Students Section */}
        <div className="mb-6">
          <h3
            className="text-lg font-semibold mb-3 hover:text-blue-700 hover:cursor-pointer"
            onClick={onClickStudents}
          >
            Associated Students
          </h3>
          <p>
            {(facultyDetails.students && facultyDetails.students.length) || 0}
          </p>
        </div>

        {/* Requests Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Pending Requests</h3>
          <ul className="space-y-2">
            {facultyDetails.requests &&
            facultyDetails.requests.length > 0 &&
            arePendingRequests(facultyDetails.requests) > 0 ? (
              facultyDetails.requests.map((request, index) => {
                if (request.status === "PENDING") {
                  return (
                    <li
                      key={index}
                      className="p-4 bg-gray-50 rounded-md shadow-sm"
                      onClick={() =>
                        navigate(`/faculty-detailedview/${request._id}`)
                      }
                    >
                      Request ID: {request.$oid || "Request ID"}
                    </li>
                  );
                }
                return null;
              })
            ) : (
              <p className="text-gray-500">No pending requests.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
