import HomePage from './HomePage';
import FacultyNavbar from './FacultyNavbar';

function FacultyHome() {
  return (
    <HomePage component={<FacultyNavbar />} />
  );
}

export default FacultyHome;