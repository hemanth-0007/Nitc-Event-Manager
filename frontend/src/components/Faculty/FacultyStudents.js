 
import FacultyNavbar from './FacultyNavbar';

import { useState, useEffect } from 'react';

import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';


const FacultyStudents = () => {

    const [students, setStudents] = useState([]);

    const navigate = useNavigate();

    const getFacultyStudents = async () => {
        const url = `${process.env.REACT_APP_API_URL}/api/faculty/students/`;
        const token = Cookies.get('token');
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await fetch(url, options);
            console.log(response);
            if(response.ok) {
                const data = await response.json();
                setStudents(data);
            }
            else{
                const data = await response.json();
                console.log(data);
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.log(error);
            console.error('Failed to fetch data');
        }
    }


    useEffect(() => {
        getFacultyStudents();
    }, []);

  
   

    return (
        <div className="min-h-screen flex flex-col">
            <FacultyNavbar />
            <div className="container mx-auto p-6 flex-grow">
                <h1 className="text-3xl font-bold text-center mb-6">My Students List</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-md">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-3 px-6 border-b text-left">Name</th>
                                <th className="py-3 px-6 border-b text-left">Email</th>
                                <th className="py-3 px-6 border-b text-left">Roll Number</th>
                                <th className="py-3 px-6 border-b text-left">Contact Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length !== 0 && students.map((student, index) => (
                                // /faculty-student/:id
                                <tr onClick={(e) => navigate(`/faculty-student/${student._id}`)} key={index} className="hover:bg-gray-50 hover:cursor-pointer">
                                    <td className="py-3 px-6 border-b">{student.name}</td>
                                    <td className="py-3 px-6 border-b">{student.email}</td>
                                    <td className="py-3 px-6 border-b">{student.rollNo}</td>
                                    <td className="py-3 px-6 border-b">{student.phoneNo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FacultyStudents;
