import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [roleFilter, setRoleFilter] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');

    useEffect(() => {
        // Fetch users from an API or database
        const fetchUsers = async () => {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data);
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [roleFilter, departmentFilter]);

    const filterUsers = () => {
        let filtered = users;

        if (roleFilter) {
            filtered = filtered.filter(user => user.role === roleFilter);
        }

        if (departmentFilter) {
            filtered = filtered.filter(user => user.department === departmentFilter);
        }

        setFilteredUsers(filtered);
    };

    return (
        <div>
            <h1>Manage Users</h1>
            <div>
                <label>
                    Role:
                    <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="admin">Admin</option>
                        <option value="faculty">Faculty</option>
                        <option value="student">Student</option>
                    </select>
                </label>
                <label>
                    Department:
                    <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="cs">Computer Science</option>
                        <option value="ee">Electrical Engineering</option>
                        <option value="me">Mechanical Engineering</option>
                        {/* Add more departments as needed */}
                    </select>
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;