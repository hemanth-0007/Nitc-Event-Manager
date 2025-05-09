// import React from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { Role } from "../../constants/roles";

import LightToastContainer from "../Toast/LightToastContainer.js";
import {renderSuccessToast, renderErrorToast} from "../Toast/toast.js";

import {studentForgotPassword} from "../../lib/authApi.js"

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

 
  const validateForm = object({
    email: string()
      .required("Email is required")
      .email("Email must be a valid email"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password cannot exceed 30 characters"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validateForm.validate(formData, { abortEarly: false });
      // console.log("Form is valid");
    } catch (error) {
      const newErrors = {};
      // console.log(error.inner);
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/api/auth/student/login/`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        // console.log("login successful");
        Cookies.set("token", data.token);
        navigate("/student-home");
      } else {
        const data = await response.json();
        // console.log(data);
        // console.log("login failed");
        renderErrorToast(data.message);
        return;
      }
    } catch (error) {
      // console.log(error.message);
      renderErrorToast(error.message);
    }
  };

  const onClickForgotPassword =  async () =>{
    const {email} = formData;
    const regex = /^[a-zA-Z0-9._%+-]+@nitc\.ac\.in$/;
    if(email === "" || email === null){
      renderErrorToast("Please enter your email address to reset your password");
      return;
    }
    if(regex.test(email) === false){
      renderErrorToast("Please enter a valid NITC email address to reset your password");
      return;
    }

    // store the email in the localStorage
    localStorage.setItem("email", email);

    try {
      const [status, data] = await studentForgotPassword(email);
      if(status){
        renderSuccessToast("OTP sent to your email address.");
        setTimeout(() =>{
          navigate("/student/forgot-password");
        }, 2000);
        return;
      }
      renderErrorToast(data && data.message ? data.message : "Failed to send OTP. Please try again later.");
    } catch (error) {
      renderErrorToast(error.message);
    }
  }

  const renderStudentLogin = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LightToastContainer />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Student Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
          >
          Email address
          </label>
          <input
          placeholder="Email"
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          value={formData.email}
          />
          {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
          >
          Password
          </label>
          <div className="relative">
          <input
            placeholder="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 mt-1"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          </div>
          {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
          <a
            href="/faculty-login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Are you a faculty?
          </a>
          </div>
        </div>
        <div>
          <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
          Sign in
          </button>
          <button 
          id="forgot-password"
          type="button"
          className="w-full px-4 py-2 mt-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={onClickForgotPassword}
          >
          Forgot Password ?
          </button>
        </div>
        </form>
      </div>
      </div>
    );
  };

  const redirectLogic = () => {
    const token = Cookies.get("token");
    if (token) {
      const user = jwtDecode(token);
      if (user.role === Role.STUDENT) {
        return <Navigate to="/student-home" />;
      } else if (user.role === Role.FACULTY) {
        return <Navigate to="/faculty-home" />;
      } else if (user.role === Role.ADMIN) {
        return <Navigate to="/admin-home" />;
      } else {
        return renderStudentLogin();
      }
    }
    return renderStudentLogin();
  };

  return redirectLogic();
}

export default LoginPage;
