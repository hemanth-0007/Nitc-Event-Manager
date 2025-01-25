import FacultyNavbar from "./FacultyNavbar";
import EmptyNotification from "./EmptyNotification";

const FacultyNotification = () =>{
    const notifications = [];

    return (
      <div className="min-h-screen bg-gray-100">
        <FacultyNavbar />
        <div className="flex items-center justify-center py-10">
          <div className="w-full max-w-4xl p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Notification History
            </h2>
            {notifications.length === 0 ? (<EmptyNotification />) : (
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
            )}
          </div>
        </div>
      </div>
    );
}

export default FacultyNotification;