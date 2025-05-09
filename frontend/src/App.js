import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/Student/StudentLogin.js';
import HomePage from './components/Student/StudentHome.js';
import RequestForm from './components/Student/StudentForm.js';
import StudentRequest from './components/Student/StudentRequest.js';
import StudentNotification from './components/Student/StudentNotification.js';
import StudentHistory from './components/Student/StudentHistory.js';
import StudentProfile from './components/Student/StudentProfile.js';
import StudentReqDetailedView from './components/Student/StudentReqDetailedView.js';

import FacultyLogin from './components/Faculty/FacultyLogin.js';
import FacultyHome from './components/Faculty/FacultyHome.js';
import FacultyRequests from './components/Faculty/FacultyRequests.js';
import FacultyReqDetailedView from './components/Faculty/FacultyReqDetailedView.js';
 


import FacultyStudents from './components/Faculty/FacultyStudents.js';
import FacultyHistory from './components/Faculty/FacultyHistory.js';
import FacultyProfile from './components/Faculty/FacultyProfile.js';
import FacultyNotification from './components/Faculty/FacultyNotification.js';
import FacultyStudentDetailed from './components/Faculty/FacultyStudentDetailed.js';

import ManageRequests from './components/ManageRequests.js';
import ManageUsers from './components/ManageUsers.js';
import ProtectedRoute from './components/ProtectRoutes/ProtectedRoute.js';


import { Role } from './constants/roles.js';

import AdminLogin from './components/Admin/AdminLogin.js';
import AdminHome from './components/Admin/AdminHome.js';
import AdminDetailedView from './components/Admin/AdminDetailedView.js';
import AdminRequests from './components/Admin/AdminRequests.js';
import AdminManageUsers from './components/Admin/AdminManageUsers.js';
import AdminManageFaculty from './components/Admin/AdminManageFaculty.js';
import AdminUserDetailed from './components/Admin/AdminUserDetailed.js';
import AdminFacultyDetailed from './components/Admin/AdminFacultyDetailed.js';
import AdminCreateUser from './components/Admin/AdminCreateUsers/AdminCreateUser.js';



import ForgotPassword from './components/ForgotPassword.js';
import ResetPassword from './components/ResetPassword.js';

 

function App() {

 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student-login" element={<LoginPage />} />
        <Route path="/student/forgot-password" element={<ForgotPassword />} />
        <Route path="/student/reset-password" element={<ResetPassword />} />
        
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-home" element={<ProtectedRoute role={Role.ADMIN} element={<AdminHome />} />} />
        <Route path="/admin-manage-requests" element={<ProtectedRoute role={Role.ADMIN} element={<AdminRequests />} />} />
        <Route path="/admin-manage-users" element={<ProtectedRoute role={Role.ADMIN} element={<AdminManageUsers />} />} />
        <Route path="/admin-manage-faculty" element={<ProtectedRoute role={Role.ADMIN} element={<AdminManageFaculty />} />} />
        <Route path="/admin-detailedview/:id" element={<ProtectedRoute role={Role.ADMIN} element={<AdminDetailedView />} />} />
        <Route path="/admin-user-detailed/:id" element={<ProtectedRoute role={Role.ADMIN} element={<AdminUserDetailed />} />} />
        <Route path="/admin-faculty-detailed/:id" element={<ProtectedRoute role={Role.ADMIN} element={<AdminFacultyDetailed />} />} />
        <Route path="/admin-add" element={<ProtectedRoute role={Role.ADMIN} element={<AdminCreateUser />} />} />



        <Route path="/student-home" element={<ProtectedRoute role={Role.STUDENT} element={<HomePage />} />} />
        <Route path="/student-request" element={<ProtectedRoute role={Role.STUDENT} element={<RequestForm />} />} />
        <Route path="/student-detailedview/:id" element={<ProtectedRoute role={Role.STUDENT} element={<StudentReqDetailedView />} />} />
        <Route path="/student-pending-requests" element={<ProtectedRoute role={Role.STUDENT} element={<StudentRequest />} />} />
        <Route path="/student-notification" element={<ProtectedRoute role={Role.STUDENT} element={<StudentNotification />} />} />
        <Route path="/student-history" element={<ProtectedRoute role={Role.STUDENT} element={<StudentHistory />} />} />
        <Route path="/student-profile" element={<ProtectedRoute role={Role.STUDENT} element={<StudentProfile />} />} />

        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/faculty-home" element={<ProtectedRoute role={Role.FACULTY} element={<FacultyHome />} />} />
        <Route path="/faculty-request" element={<ProtectedRoute role={Role.FACULTY} element={<FacultyRequests />} />} />
        <Route path="/faculty-students" element={<ProtectedRoute role={Role.FACULTY} element={<FacultyStudents />} />} />
        <Route path="/faculty-notification" element={<ProtectedRoute role={Role.FACULTY} element={<FacultyNotification />} />} />
        <Route path="/faculty-detailedview/:id" element={<ProtectedRoute role={Role.FACULTY} element={<FacultyReqDetailedView />} />} />
        <Route path="/faculty-student/:id" element={<ProtectedRoute role={Role.FACULTY} element={<FacultyStudentDetailed />} />} />
        <Route path="/faculty-history" element={<ProtectedRoute role={Role.FACULTY} element={<FacultyHistory />} />} />
        <Route path="/faculty-profile" element={<ProtectedRoute role={Role.FACULTY} element={<FacultyProfile />} />} />
        {/* any other path redirect to login */}
        <Route path="*" element={<Navigate to = '/' />} />
      </Routes>
    </Router>


  );
}

export default App; 