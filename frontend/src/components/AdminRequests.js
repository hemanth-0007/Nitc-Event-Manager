import AdminNavbar from "./AdminNavbar";
import Requests from "./Requests";

const AdminRequests = () => {
    const url = `${process.env.REACT_APP_API_URL}/api/admin/requests/`
    return <Requests title = {"All Requests"} navbar={<AdminNavbar />} url={url} />;
}

export default AdminRequests;   