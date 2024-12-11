import React from 'react';
import FacultyNavbar from './FacultyNavbar';

function FacultyHome() {
  return (
    <div>
      <FacultyNavbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold">Welcome to the Home Page!</h1>
      </div>
    </div>
  );
}

export default FacultyHome;