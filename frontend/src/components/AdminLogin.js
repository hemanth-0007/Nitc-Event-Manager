import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();

    // Function to handle login and navigate to home page
    const handleLogin = () => {
        // You can add authentication logic here
        navigate('/admin-home'); // Redirect to the home page
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-orange-800 p-10 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-4xl font-extrabold text-center text-white mb-8">Admin Login</h2>
                <form>
                    <div className="mb-5">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow-lg border-2 border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-8">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow-lg border-2 border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-purple-700 hover:bg-purple-800 text-white font-extrabold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-600"
                            type="button"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>  
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
