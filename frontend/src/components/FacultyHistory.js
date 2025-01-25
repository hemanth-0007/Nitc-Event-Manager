import React from 'react';
import FacultyNavbar from './FacultyNavbar';

 
import History from "./History";
function FacultyHistory() {
  const url = `${process.env.REACT_APP_API_URL}/api/faculty/req/`;
  return <History navbar={<FacultyNavbar />} url={url} />;
}
export default FacultyHistory;
