import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

 
import Cookies from "js-cookie";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function FacultyLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    useEffect(() => {
      const focusInput = () => {
        const firstNameelement = document.getElementById("email");
        firstNameelement.focus();
      };
     focusInput();
    }, []);


    const onKeyDownPassword = (e) => {
      if(e.key === "Enter") {
        handleSubmit(e);
      }
    }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `${process.env.REACT_APP_API_URL}/api/auth/faculty/login/`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      // console.log("login successful");
      Cookies.set("token", data.token);
      navigate("/faculty-home");
      return;
    } else {
      const data = await response.json();
      console.log(data);
      console.log("login failed");
      toast.error(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={2998}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Faculty Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              onKeyDown={onKeyDownPassword}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center"></div>
            {/* <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div> */}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FacultyLogin;
