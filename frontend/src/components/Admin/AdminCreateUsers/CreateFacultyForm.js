import { useState } from "react";
import {
  Departments,
  departmentArray,
} from "../../../constants/departments.js";
import { createFaculty } from "../../../lib/adminApi.js";
import LightToastContainer from "../../Toast/LightToastContainer.js";
import { renderErrorToast, renderSuccessToast } from "../../Toast/toast.js";

const CreateFacultyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    department: "",
  });

  const [error, setError] = useState({
    name: "Student",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    department: "",
  });

  const { name, email, password, phoneNo, confirmPassword, department } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangePassword = (e) => {
    const password = e.target.value;
    const { confirmPassword } = formData;
    if (confirmPassword !== "" && confirmPassword !== password) {
      setError({ ...error, confirmPassword: "Password does not match" });
      setFormData({ ...formData, password });
    } else {
      setError({ ...error, confirmPassword: "" });
      setFormData({ ...formData, password });
    }
    return;
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    const { password } = formData;
    if (confirmPassword !== password) {
      setError({ ...error, confirmPassword: "Password does not match" });
      setFormData({ ...formData, confirmPassword });
    } else {
      setError({ ...error, confirmPassword: "" });
      setFormData({ ...formData, confirmPassword });
    }
    return;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // createFaculty(formData);
    const [status, data] = await createFaculty(formData);
    if (status) {
      let message =
        data && data.message ? data.message : "Faculty created successfully";
      // alert(message);
      renderSuccessToast(message);
    } else {
      let message =
        data && data.message
          ? data.message
          : "Something went wrong in creating faculty";
      // alert(message);
      renderErrorToast(message);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNo: "",
      department: "",
    });
  };

  return (
    <>
      <LightToastContainer />
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChange}
          value={name}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="text"
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChange}
          value={email}
        />
      </div>
      <div>
        <label
          htmlFor="department"
          className="block text-sm font-medium text-gray-700"
        >
          Department *
        </label>
        <select
          id="department"
          name="department"
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChange}
          value={department}
        >
          <option value="">Select Department</option>
          {departmentArray.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password *
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChangePassword}
          value={password}
        />
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password *
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="confirmPassword"
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChangeConfirmPassword}
          value={confirmPassword}
        />
        <p className="text-red-600">{error.confirmPassword}</p>
      </div>

      <div>
        <label
          htmlFor="phoneNo"
          className="block text-sm font-medium text-gray-700"
        >
          Phone No *
        </label>
        <input
          id="phoneNo"
          name="phoneNo"
          type="text"
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChange}
          value={phoneNo}
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onSubmit}
        >
          Submit
        </button>
        <button
          type="reset"
          className="px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={resetForm}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default CreateFacultyForm;
