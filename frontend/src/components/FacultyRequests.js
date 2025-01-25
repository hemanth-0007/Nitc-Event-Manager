 
import FacultyNavbar from './FacultyNavbar';
import Requests from './Requests';

const FacultyRequests = () => {
  const url = `${process.env.REACT_APP_API_URL}/api/faculty/req/pending/`
  return <Requests navbar={<FacultyNavbar />} url={url} />;
};

export default FacultyRequests;
