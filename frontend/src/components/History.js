import React from "react";
import NavBar from "./StudentNavbar";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { StatusType } from "../constants/StatusTypes";

import {jwtDecode} from "jwt-decode";

import { useNavigate } from "react-router-dom";

import {Role} from "../constants/roles.js";

const  History = ({ navbar, url }) => {
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

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [isApiFailed, setIsApiFailed] = useState(false);

  const [requests, setRequests] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const getRequests = async () => {
    setLoading(true);
    try {
      //   const url = `${process.env.REACT_APP_API_URL}/api/student/req/`;
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
        setIsApiFailed(false);
      } else {
        const data = await response.json();
        console.log(data);
        setLoading(false);
        setIsApiFailed(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsApiFailed(true);
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
  }
  let filteredRequests = requests.filter((request) => {
    return request.title.toLowerCase().includes(searchInput.toLowerCase());
  });

  if (statusFilter !== '') {
    filteredRequests = filteredRequests.filter((request) => {
      return request.status === statusFilter;
    });
  }


  const renderRequestsTable = (filteredRequests) => {

    if(filteredRequests.length === 0){
      return (
        <div className="flex items-center justify-center">
          <p className="text-gray-600 text-center">
            No requests found.
          </p>
        </div>
      );
    }

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
          {filteredRequests.map((request, index) => (
            <tr className="hover:cursor-pointer" onClick={e => onClickPendingRequest(e, request)} key={index}>
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
  };
  const renderNavbar = () => {
    return navbar;
  }


  const renderRetryView = () => {
    return (
      <div className="flex flex-col items-center justify-center">
      <p className="text-slate-600 mb-4">Something went wrong. Please retry!</p>
      <button 
        onClick={getRequests} 
        className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700"
      >
        Retry
      </button>
      </div>
    )
  }

 
  return (
    <div>
      {renderNavbar()}
      <div className="flex items-center justify-center mt-4 bg-gray-100">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          // onKeyDown={(e) => {onKeyDownSearchInput(e)}}
          type="text"
          placeholder="Search requests..."
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-8 bg-white rounded shadow-md">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-center mb-6 ml-3">
              Requests History
            </h2>
            <div className="flex items-center justify-center mb-4">
              <select
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All</option>
                <option value={StatusType.ACCEPTED}>Accepted</option>
                <option value={StatusType.REJECTED}>Rejected</option>
                <option value={StatusType.PENDING}>Pending</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          )}
          {!loading && !isApiFailed && requests.length === 0 && (
            <div className="flex items-center justify-center">
              <p className="text-gray-600 text-center">
                You have no request history yet.
              </p>
            </div>
          )}
          {!loading && !isApiFailed && requests.length > 0 && renderRequestsTable(filteredRequests)}
          {!loading && isApiFailed && renderRetryView()}
        </div>
      </div>
    </div>
  );
}
export default History;
 