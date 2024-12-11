import React from 'react';
import FacultyNavbar from './FacultyNavbar';

function History() {
  const notifications = [
    'Notification 1',
    'Notification 2',
    'Notification 3',
    'Notification 4',
    'Notification 5',
    'Notification 6',
    'Notification 7',
    'Notification 8',
    'Notification 9',
    'Notification 10',
    'Notification 11',
    // Add more notifications as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <FacultyNavbar />
      <div className="flex items-center justify-center py-10">
        <div className="w-full max-w-4xl p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Notification History
          </h2>
          <ul className="space-y-3">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="flex items-center px-4 py-3 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition duration-200"
              >
                <span className="text-gray-700">{notification}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default History;
