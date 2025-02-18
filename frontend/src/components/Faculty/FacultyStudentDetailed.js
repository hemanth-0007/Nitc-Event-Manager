
import FacultyNavbar from "./FacultyNavbar";

import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import StudentCard from "../Student/StudentCard";

// import react loader spinner
import {TailSpin} from "react-loader-spinner";


const FacultyStudentDetailed = () => {


  const {id} = useParams();
  const navigate = useNavigate();
  console.log(id);

  const [student, setStudent] = useState(null);

  const onClickRequest = (e, requestId) => {
    navigate(`/faculty-detailedview/${requestId}`);
  }

  // const url = `${process.env.REACT_APP_API_URL}/api/faculty/student/${id}`;

  const getStudent = async (id) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/faculty/student/${id}`;
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
        setStudent(data);
        console.log(data);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getStudent(id);
  }, []);

  return (
    <div>
        <FacultyNavbar />
      {/* <h1>Faculty Student Detailed</h1> */}
      {!student &&   
        <div className="flex justify-center items-center h-screen">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      }
      {student && <StudentCard student={student} onClickRequest={onClickRequest} />}
    </div>
  );
};

export default FacultyStudentDetailed;