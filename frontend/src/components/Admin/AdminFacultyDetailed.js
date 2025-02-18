import AdminNavbar from "./AdminNavbar";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";


import { useNavigate, useParams } from "react-router-dom";

const AdminFacultyDetailed = () => {
  const nagivate = useNavigate();

  const { id } = useParams();

  const [faculty, setFaculty] = useState({});

  const getFaculty = async () => {
    const token = Cookies.get("token");
    const url = `${process.env.REACT_APP_API_URL}/api/admin/faculty/${id}`;
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
        setFaculty(data);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFaculty();
  }, []);

  const onClickRequest = (e, reqId) => {
    nagivate(`/admin-detailedview/${reqId}`);
  };

  const FacultyDetailed = () => {
    return (
      <div className="flex flex-col items-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <img
          src={faculty.profileUrl}
          alt={`${faculty.name}'s profile`}
          className="w-32 h-32 rounded-full shadow-lg mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800">{faculty.name}</h1>
        <p className="text-sm text-gray-500 mt-1 mb-4">{faculty.role}</p>

        <div className="w-full space-y-4 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Department:</span>
            <span className="text-gray-800">{faculty.department}</span>
          </div>
 

          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Phone No:</span>
            <span className="text-gray-800">{faculty.phoneNo}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-800">{faculty.email}</span>
          </div>

          <div className="mt-6">
            <h2 className=" hover:text-blue-700 hover:underline text-lg font-semibold text-gray-700 mb-2">
              Requests
            </h2>

            {faculty.requests && faculty.requests.length > 0 ? (
              faculty.requests.map((request, index) => (
                <div
                  key={request}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
                >
                  <span
                    onClick={(e) => onClickRequest(e, request)}
                    className="text-gray-600 hover:underline hover:cursor-pointer hover:text-blue-600"
                  >
                    Request : {index + 1}
                  </span>
                </div>
              ))
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
      <AdminNavbar />

      {faculty ? (
        <FacultyDetailed />
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default AdminFacultyDetailed;
