
import NavBar from "./StudentNavbar"
import HomePage from "../HomePage"

const StudentHome = () => { 
    return <HomePage component={<NavBar />} />;
} 

export default StudentHome