import { useEffect, useState } from "react";
import { departmentArray } from "../../../constants/departments.js";
import { createStudent, getFaculties } from "../../../lib/adminApi.js";
import LightToastContainer from "../../Toast/LightToastContainer.js";
import { renderErrorToast, renderSuccessToast } from "../../Toast/toast.js";


const CreateStudentForm = () => {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    department: "",
    facultyId: "",
  });

  const [faculties, setFaculties] = useState([]);

  const fetchFaculties = async () => {
    const faculties = await getFaculties();
    // console.log(faculties);
    setFaculties(faculties);
    return;
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const {
    rollNo,
    name,
    email,
    password,
    phoneNo,
    confirmPassword,
    department,
  } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
    // console.log(formData);
    try {
      const [status, data] = await createStudent(formData);
      if (status) {
        let message =
          data && data.message ? data.message : "Student created successfully";
        // alert(message);
        renderSuccessToast(message);
      } else {
        let message =
          data && data.message
            ? data.message
            : "Something went wrong in creating student";
        // alert(message);
        renderErrorToast(message);
      }
    } catch (error) {
      console.error(error);
      // alert(error.message);
      renderErrorToast(error.message);
    }
    resetForm();
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeFaculty = (e) => {
    // console.log(e.target);
    setFormData({ ...formData, facultyId: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      rollNo: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNo: "",
      department: "",
      facultyId: "",
    });
  };

  return (
    <>
      <LightToastContainer />
      <div>
        <label
          htmlFor="rollNo"
          className="block text-sm font-medium text-gray-700"
        >
          Roll No *
        </label>
        <input
          id="rollNo"
          name="rollNo"
          type="text"
          maxLength="9"
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChange}
          value={rollNo}
        />
      </div>
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
          type="email"
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
          onChange={onChange}
          value={password}
        />
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Conform Password *
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="text"
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChange}
          value={confirmPassword}
        />
      </div>
      <div>
        <label
          htmlFor="faculty"
          className="block text-sm font-medium text-gray-700"
        >
          Faculty *
        </label>
        <select
          id="faculty"
          name="faculty"
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChangeFaculty}
        >
          <option value="">Select Faculty</option>
          {faculties &&
            faculties.length !== 0 &&
            faculties.map((faculty) => (
              <option key={faculty._id} value={faculty._id}>
                {faculty.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="phoneNo"
          className="block text-sm font-medium text-gray-700"
        >
          Phone No*
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
          onClick={onSubmit}
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
        <button
          type="reset"
          className="px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={() =>
            setFormData({
              rollNo: "",
              name: "",
              email: "",
              password: "",
              phoneNo: "",
            })
          }
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default CreateStudentForm;
