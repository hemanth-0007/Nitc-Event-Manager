import React from 'react';
import FacultyNavbar from './FacultyNavbar';

const DetailedView = () => {
  return (
    <div>
        <FacultyNavbar />
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Request Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <p className="text-gray-600"><strong>Student Name:</strong> Student Name</p>
          <p className="text-gray-600"><strong>Roll No:</strong> 123456</p>
          <p className="text-gray-600"><strong>Email:</strong> student@example.com</p>
          <p className="text-gray-600"><strong>Contact:</strong> +1234567890</p>
          <p className="text-gray-600"><strong>Title:</strong> Request Title</p>
          <p className="text-gray-600"><strong>Category:</strong> Request Category</p>
          <p className="text-gray-600"><strong>Description:</strong> Request Description</p>
          <p className="text-gray-600"><strong>Location:</strong> Request Location</p>
          <p className="text-gray-600"><strong>Time:</strong> Request Time</p>
          <p className="text-gray-600"><strong>Attached Documents:</strong> <a href="#" className="text-blue-500">Document Link</a></p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>
          <form>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              placeholder="Add your comments here..."
            ></textarea>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DetailedView;
