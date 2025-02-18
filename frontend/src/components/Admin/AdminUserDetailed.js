import AdminNavbar from "./AdminNavbar";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";


import { useNavigate, useParams } from "react-router-dom";

import StudentCard from "../Student/StudentCard";

const AdminUserDetailed = () => {
  const nagivate = useNavigate();

  const { id } = useParams();

  const [student, setStudent] = useState({});

  const getStudent = async () => {
    const token = Cookies.get("token");
    const url = `${process.env.REACT_APP_API_URL}/api/admin/student/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setStudent(data);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  const onClickRequest = (e, reqId) => {
    nagivate(`/admin-detailedview/${reqId}`);
  };

 

  return (
    <div>
      <AdminNavbar />

      {student.name ? (
        <StudentCard student={student} onClickRequest={onClickRequest} />
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default AdminUserDetailed;
