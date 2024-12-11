import React from 'react';
import FacultyNavbar from './FacultyNavbar';

const FacultyStudents = () => {
    const students = [
        { name: 'John Doe', email: 'john@example.com', rollNumber: '123', contactNumber: '1234567890' },
        { name: 'Jane Smith', email: 'jane@example.com', rollNumber: '124', contactNumber: '0987654321' },
        // Add more students as needed
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <FacultyNavbar />
            <div className="container mx-auto p-6 flex-grow">
                <h1 className="text-3xl font-bold text-center mb-6">Student List</h1>
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
                            {students.map((student, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-3 px-6 border-b">{student.name}</td>
                                    <td className="py-3 px-6 border-b">{student.email}</td>
                                    <td className="py-3 px-6 border-b">{student.rollNumber}</td>
                                    <td className="py-3 px-6 border-b">{student.contactNumber}</td>
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
