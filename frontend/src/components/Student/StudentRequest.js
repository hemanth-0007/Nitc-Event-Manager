import React from "react";
import NavBar from "./StudentNavbar";
import Requests from "../Requests";

const StudentRequest = () => {
  const url = `${process.env.REACT_APP_API_URL}/api/student/req/pending/`
  return <Requests title = {"Pending Requests"} navbar={<NavBar />} url={url} />;
}

export default StudentRequest;
