import AdminNavbar from "./AdminNavbar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminManageFaculty = () => {
    const navigate = useNavigate();

    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFaculty();
  }, []);

  const getFaculty = async () => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/admin/faculty/`;
      console.log(url);
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFaculty(data);
        setLoading(false);
      } else {
        const data = await response.json();
        console.log(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onClickFacultyCard = (e, user) => {
    navigate(`/admin-faculty-detailed/${user._id}`);
  };

  const renderFacultyTable = () => {
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Sl. No
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              No Of Requests
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Phone No.
            </th>
            {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                Created Date
                </th>
                <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                Status
                </th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {faculty.map((fac, index) => (
            <tr
              className="hover:cursor-pointer hover:bg-gray-100"
              key={index}
              onClick={(e) => onClickFacultyCard(e, fac)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {fac.name || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {fac.requests.length || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {fac.phoneNo || 0}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    {getStatusDot(request.status)}
                    {request.status}
                </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <AdminNavbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Faculty</h2>
          {/* add react loader spinner */}
          {loading && (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          )}
          {!loading && faculty.length === 0 && (
            <div className="flex items-center justify-center">
              <p className="text-gray-600 text-center">
                You have no pending faculty yet. Check back later!
              </p>
            </div>
          )}
          {!loading && faculty.length > 0 && renderFacultyTable()}
        </div>
      </div>
    </div>
  );
}


export default AdminManageFaculty;