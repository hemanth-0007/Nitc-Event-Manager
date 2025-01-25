import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';


const AdminLogin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState("");

    // Function to handle login and navigate to home page
    const handleLogin = () => {
        // You can add authentication logic here
        navigate('/admin-home'); // Redirect to the home page
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
     
    
        const url = `${process.env.REACT_APP_API_URL}/api/admin/login/`;
    
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
    
        const response = await fetch(url, options);
    
        if(response.ok){
          const data = await response.json();
          console.log(data);
          console.log("admin login successful");
          Cookies.set("token", data.token);
          navigate('/admin-home');
        }
        else{
          const data = await response.json();
          console.log(data);
          console.log("admin login failed");
          setError(data.message);
        }
        // navigate('/admin-home');
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
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <p className='text-white'>{error}</p>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-purple-700 hover:bg-purple-800 text-white font-extrabold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-600"
                            type="button"
                            onClick={handleSubmit}
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
