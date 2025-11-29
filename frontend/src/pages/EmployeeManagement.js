import React, {useEffect, useState} from "react";
import {data, Link, useNavigate} from "react-router-dom";
import {deleteEmp} from "../api/DeleteEmployee";
import "./css/EmployeeManagement.css";
import {getEmp} from "../api/GetEmployees";

export default function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getEmp()
            .then(data => {
                setEmployees(data.employees || []);
            })
            .catch(err => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;

        try {
            const res = deleteEmp(data)

            if (res.ok) {
                setEmployees(employees.filter(emp => emp.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="employee-container">
            <Link to="/employeeManagement/createEmployee">
                <button>Create Employee</button>
            </Link>
            <h1>Employee Management</h1>

            <table className="employee-table">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {employees.map(emp => (
                    <tr key={emp.id}>
                        <td>{emp.first_name}</td>
                        <td>{emp.last_name}</td>
                        <td>{emp.email}</td>
                        <td>
                            <button onClick={() => navigate(`/employees/${emp._id}`)}>View</button>
                            <button onClick={() => navigate(`/employees/edit/${emp._id}`)}>Edit</button>
                            <button onClick={() => handleDelete(emp.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}