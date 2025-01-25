import React from "react";
 

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { StatusType } from "../constants/StatusTypes";
 

import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";


import { Role } from "../constants/roles";


function Requests({title, navbar, url}) {
   
  const renderNavBar = () => {
    return navbar;
  }


  const navigate = useNavigate();

  const getStatusDot = (status) => {
    let color;
    switch (status) {
      case StatusType.ACCEPTED:
        color = "bg-green-500";
        break;
      case StatusType.PENDING:
        color = "bg-orange-500";
        break;
      case StatusType.REJECTED:
        color = "bg-red-500";
        break;
      default:
        color = "bg-gray-500";
    }
    return (
      <span
        className={`inline-block w-3 h-3 mr-2 rounded-full ${color}`}
      ></span>
    );
  };

  const [loading, setLoading] = useState(false);

  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    setLoading(true);
    try {
    //   const url = `${process.env.REACT_APP_API_URL}/api/student/req/pending/`;
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
        setRequests(data);
        setLoading(false);
      } else {
        const data = await response.json();
        console.log(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const onClickPendingRequest = (e, request) => {
    const user = jwtDecode(Cookies.get("token"));
    if (user.role === Role.STUDENT) {
        navigate(`/student-detailedview/${request._id}`);
    }
    else if (user.role === Role.FACULTY) {
        navigate(`/faculty-detailedview/${request._id}`);
    }
    else if(user.role === Role.ADMIN){
        navigate(`/admin-detailedview/${request._id}`);
    }
    
  }


  const renderRequestsTable = () => {
    return (
      <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request, index) => (
                <tr className="hover:cursor-pointer" key={index} onClick={e => onClickPendingRequest(e, request)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    {getStatusDot(request.status)}
                    {request.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    );
  }

  

  return (
    <div>
      {renderNavBar()}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
          {/* add react loader spinner */}
          {loading && (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          )}
          {!loading && requests.length === 0 && (
            <div className="flex items-center justify-center">
              <p className="text-gray-600 text-center">
                You have no pending requests yet. Check back later!
              </p>
            </div>
          )}
          {!loading && requests.length > 0 && renderRequestsTable()}
        </div>
      </div>
    </div>
  );
}

export default Requests;
