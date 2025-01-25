import NavBar from "./StudentNavbar";
import History from "./History";
function StudentHistory() {
  const url = `${process.env.REACT_APP_API_URL}/api/student/req/`;
  return <History navbar={<NavBar />} url={url} />;
}
export default StudentHistory;
