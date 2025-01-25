import React from "react";
import NavBar from "./StudentNavbar";
import homepageImage from "../assets/homepage.jpg";


function HomePage({component}) {
   
  const renderComponent = () => {
    return component;
  }

  return (
    <div>
      {renderComponent()}
      <div className="h-screen bg-gray-100">
        <div className="flex flex-col items-center justify-center h-full p-6 space-y-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to the Home Page!
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 md:p-10 space-y-4 md:space-y-0 md:space-x-6">
            <div className="md:w-1/2">
              <p className="text-lg text-gray-700 text-center md:text-left">
                Our digital system at NIT Calicut streamlines facility
                permissions for events. Students can now easily request venues,
                bus services, and more, upload documents, and track status in
                real-time.
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src={homepageImage}
                alt="Event"
                className="w-80 rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
