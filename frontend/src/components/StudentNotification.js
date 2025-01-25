import React from 'react';
import NavBar from './StudentNavbar';
import EmptyNotification from './EmptyNotification';

import { useSocket } from '../contexts/socketProvider.js';




function StudentNotification() {
  
  const {notifications, markAsRead, markAllRead} = useSocket();
  
 
 
  const renderNotification = (notification) => {

    const date = new Date(notification.createdAt).toLocaleString();
    return (
      <div className={`flex flex-row justify-between w-full ${notification.isRead ? 'bg-gray-200' : 'bg-white'} p-2 rounded-md`}>
        <div>
          <p>{notification && notification.message || "NA"}</p>
          <p className='font-semibold'>{notification && date || "NA"}</p>
        </div>
        <p className='hover:cursor-pointer hover:bg-slate-400 p-2 rounded-md hover:text-white' 
        onClick={(e) => markAsRead(notification._id)}
        >
          Mark as Read
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex items-center justify-center py-10">
        <div className="w-full max-w-4xl p-6 bg-white rounded-md shadow-md">
          <div className='flex justify-between'>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 ml-4">
              Notification History
            </h2>
            <button
              onClick={markAllRead}
              className='rounded-md bg-slate-500 px-2 text-white hover:bg-slate-600 m-2'
            >
              Mark All Read
            </button>  
          </div>
          {notifications.length === 0 ? (<EmptyNotification />) : (
             <ul className="space-y-3">
             {notifications.map((notification, index) => (
               <li key={index}>
                 {/* <span className="text-gray-700">{notification.message}</span> */}
                 {renderNotification(notification)}
               </li>
             ))}
           </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentNotification;
