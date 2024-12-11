import React from 'react';
import NavBar from './StudentNavbar';

function Requests() {
  const requestData = [
    { title: 'Event 1', category: 'Venue Booking', createdDate: '02-11-2024', status: 'Pending' },
    { title: 'Event 2', category: 'Bus Services', createdDate: '26-10-2024', status: 'Approved' },
    { title: 'Event 3', category: 'Venue Booking', createdDate: '30-10-2024', status: 'Rejected' },
  ];

  const getStatusDot = (status) => {
    let color;
    switch (status) {
      case 'Approved':
        color = 'bg-green-500';
        break;
      case 'Pending':
        color = 'bg-orange-500';
        break;
      case 'Rejected':
        color = 'bg-red-500';
        break;
      default:
        color = 'bg-gray-500';
    }
    return <span className={`inline-block w-3 h-3 mr-2 rounded-full ${color}`}></span>;
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Requests</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requestData.map((request, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.createdDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    {getStatusDot(request.status)}
                    {request.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Requests;