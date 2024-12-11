import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    // Fetch requests from an API or database
    // This is just a placeholder
    const fetchedRequests = [
      { id: 1, title: 'Request 1', createdTime: '2023-10-01 10:00' },
      { id: 2, title: 'Request 2', createdTime: '2023-10-02 11:00' },
    ];
    setRequests(fetchedRequests);
  }, []);

  const handleActionChange = (id, action) => {
    // Handle the approval/rejection logic here
    console.log(`Request ${id} has been ${action}`);
  };

  const handleTitleClick = () => {
    navigate('/detailedview'); // Navigate to detailedview page
  };

  return (
    
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Faculty Requests</h2>
          <ul className="space-y-3">
            {requests.map((request) => (
              <li key={request.id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition duration-200">
                <span onClick={handleTitleClick} className="text-blue-600 cursor-pointer">{request.title}</span>
                <span className="text-gray-600">{request.createdTime}</span>
                <select onChange={(e) => handleActionChange(request.id, e.target.value)} className="ml-4 p-2 border rounded-md">
                  <option value="">Select Action</option>
                  <option value="approved">Approve</option>
                  <option value="rejected">Reject</option>
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default ManageRequests;
