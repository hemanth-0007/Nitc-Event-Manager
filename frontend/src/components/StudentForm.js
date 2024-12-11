import React from 'react';
import NavBar from './StudentNavbar';

function RequestForm() {
  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center">Request Form</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input id="title" name="title" type="text" required className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select id="category" name="category" required className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select a category</option>
                <option value="category1">Venue Booking</option>
                <option value="category2">Bus services</option>
                {/* <option value="category3">Category 3</option> */}
              </select>
            </div>
            <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Location</label>
              <select id="category" name="category" required className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select the required location</option>
                <option value="category1">GRTT(OAT)</option>
                <option value="category2">Auditorium</option>
                <option value="category3">Aryabhatta</option>
              </select>
            </div>
            <div>
              <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">Start Time</label>
              <input id="start-time" name="start-time" type="datetime-local" required className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">End Time</label>
              <input id="end-time" name="end-time" type="datetime-local" required className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="description" name="description" rows="4" required className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div>
              <label htmlFor="document" className="block text-sm font-medium text-gray-700">Upload Document</label>
              <input id="document" name="document" type="file" className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="flex justify-between">
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
              <button type="reset" className="px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestForm;