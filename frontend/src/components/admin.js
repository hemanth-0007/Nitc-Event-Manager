import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Admin = () => {
    const navigate = useNavigate();

    const handleManageRequests = () => {
        navigate('/manage-requests');
    };

    const handleManageStudentsFaculty = () => {
        navigate('/manage-students-faculty');
    };

    const requestData = {
        labels: ['Total Requests', 'Approved', 'Pending', 'Rejected'],
        datasets: [
            {
                label: 'Requests',
                data: [100, 60, 30, 10], // Example data
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const studentData = {
        labels: ['CSE', 'ECE', 'EEE', 'ME', 'CE'], // Example departments
        datasets: [
            {
                label: 'Students',
                data: [200, 150, 100, 120, 80], // Example data
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const facultyData = {
        labels: ['CSE', 'ECE', 'EEE', 'ME', 'CE'], // Example departments
        datasets: [
            {
                label: 'Faculty',
                data: [20, 15, 10, 12, 8], // Example data for faculty count
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Part 1: Manage Requests Button */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Actions</h2>
                <div className="flex flex-col space-y-4">
                    <button 
                        onClick={handleManageRequests} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Manage Requests
                    </button>
                    <button 
                        onClick={handleManageStudentsFaculty} 
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
                    >
                        Manage Students and Faculty
                    </button>
                </div>
            </div>

            {/* Part 2: Requests Overview Bar Plot */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Requests Overview</h2>
                <Bar data={requestData} />
            </div>

            {/* Part 3: Students by Department Bar Plot */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Students by Department</h2>
                <Bar data={studentData} />
            </div>

            {/* Part 4: Faculty by Department Bar Plot */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Faculty by Department</h2>
                <Bar data={facultyData} />
            </div>
        </div>
    );
};

export default Admin;
