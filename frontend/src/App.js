import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/StudentLogin';
import HomePage from './components/StudentHome';
import RequestForm from './components/StudentForm';
import StudentRequest from './components/StudentRequest';
import StudentNotification from './components/StudentNotification.js';
import StudentHistory from './components/StudentHistory.js';
import StudentProfile from './components/StudentProfile.js';
import StudentReqDetailedView from './components/StudentReqDetailedView.js';

import FacultyLogin from './components/FacultyLogin';
import FacultyHome from './components/FacultyHome';
import FacultyRequests from './components/FacultyRequests';
import FacultyReqDetailedView from './components/FacultyReqDetailedView.js';
 


import FacultyStudents from './components/FacultyStudents.js';
import FacultyHistory from './components/FacultyHistory.js';
import FacultyProfile from './components/FacultyProfile';
import FacultyNotification from './components/FacultyNotification.js';

import Admin from './components/admin.js';
import AdminLogin from './components/AdminLogin.js';
import ManageRequests from './components/ManageRequests.js';
import ManageUsers from './components/ManageUsers.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import AdminHome from './components/AdminHome.js';


import { Role } from './constants/roles.js';

import AdminDetailedView from './components/AdminDetailedView.js';
import AdminRequests from './components/AdminRequests.js';
import AdminManageUsers from './components/AdminManageUsers.js';
import AdminManageFaculty from './components/AdminManageFaculty.js';
import AdminUserDetailed from './components/AdminUserDetailed.js';
import AdminFacultyDetailed from './components/AdminFacultyDetailed.js';
import FacultyStudentDetailed from './components/FacultyStudentDetailed.js';

import {io} from 'socket.io-client';
import Cookies from 'js-cookie';


function App() {

  // useEffect(() => {
  //   const socket = io('http://localhost:8082',  {
  //     auth: {
  //       token: localStorage.getItem('token')
  //     }
  //   });
 
  //   socket.on('connect', () => {
  //     console.log('Connected to the server', socket.id);
  //   });

  //   return () => {
  //     socket.disconnect();
  //     console.log('Disconnected from the server');
  //   };
  // }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student-login" element={<LoginPage />} />
        
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-home" element={<ProtectedRoute role={Role.ADMIN} element={<AdminHome />} />} />
        <Route path="/admin-manage-requests" element={<ProtectedRoute role={Role.ADMIN} element={<AdminRequests />} />} />
        <Route path="/admin-manage-users" element={<ProtectedRoute role={Role.ADMIN} element={<AdminManageUsers />} />} />
        <Route path="/admin-manage-faculty" element={<ProtectedRoute role={Role.ADMIN} element={<AdminManageFaculty />} />} />
        <Route path="/admin-detailedview/:id" element={<ProtectedRoute role={Role.ADMIN} element={<AdminDetailedView />} />} />
        <Route path="/admin-user-detailed/:id" element={<ProtectedRoute role={Role.ADMIN} element={<AdminUserDetailed />} />} />
        <Route path="/admin-faculty-detailed/:id" element={<ProtectedRoute role={Role.ADMIN} element={<AdminFacultyDetailed />} />} />



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