
import {useState} from 'react'; 
import { Role } from '../../../constants/roles';
import CreateStudentForm from './CreateStudentForm';
import CreateFacultyForm from './CreateFacultyForm';


const AdminCreateUserForm = () => {
        // const [formData, setFormData] = useState({
        //     role: "Student",
        //     rollNo: "",
        //     name: "",
        //     email: "",
        //     password: "",
        //     confirmPassword: "",
        //     phoneNo: "",
        // });


        const [role, setRole] = useState(Role.STUDENT);

        const onChangeRole = (e) => {
            setRole(e.target.value);
        }


       
        const onSubmit = (e) => {
            e.preventDefault();
            // Add form submission logic here
        };

        // const { role, rollNo, name, email, password, phoneNo , confirmPassword} = formData;

        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded shadow-md">
                {/* <h2 className="text-2xl font-bold text-center">Create User</h2> */}
                <form className="space-y-6" onSubmit={onSubmit}>
                <div className='mb-4 shadow-md'>
                    <label
                    htmlFor="role"
                    className="block text-md font-bold  text-gray-700 text-center"
                    >
                    Role
                    </label>
                    <select
                    id="role"
                    name="role"
                    required
                    className="w-full text-center px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={onChangeRole}
                    value={role}
                    >
                    <option value={Role.STUDENT}>Student</option>
                    <option value={Role.FACULTY}>Faculty</option>
                    </select>
                </div>
                {role === Role.STUDENT && <CreateStudentForm />}
                {role === Role.FACULTY && <CreateFacultyForm />}
                </form>
            </div>
            </div>
        );
};

export default AdminCreateUserForm;
