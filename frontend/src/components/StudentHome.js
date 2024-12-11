import React from 'react';
import NavBar from './StudentNavbar';

function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold">Welcome to the Home Page!</h1>
      </div>
    </div>
  );
}

export default HomePage;