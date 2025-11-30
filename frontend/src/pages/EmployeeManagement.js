import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {deleteEmp} from "../api/DeleteEmployee";
import "./css/EmployeeManagement.css";
import {getEmp} from "../api/GetEmployees";

export default function EmployeeManagement() {
    // State to hold the list of employees
    const [employees, setEmployees] = useState([]);

    // navigation hook to go to other pages
    const navigate = useNavigate();

    // get all employees when page
    useEffect(() => {
        getEmp()
            .then(data => {
                // set employees array or empty array if undefined
                setEmployees(data.employees || []);
            })
            .catch(err => console.error(err));
    }, []);

    // delete employee
    const handleDelete = async (id) => {
        // confirmation window
        if (!window.confirm("Are you sure you want to delete this employee?")) return;

        try {
            // api call to delete employee
            const res = await deleteEmp(id);

            if (res.status) {
                // Remove deleted employee from local state to update page
                setEmployees(employees.filter(emp => emp._id !== id));
            } else {
                console.error("Failed to delete employee");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="employee-container">
            <h1>Employee Management</h1>
            <Link to="/employeeManagement/createEmployee">
                <button>Create Employee</button>
            </Link>
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
                            <button className={"viewBtn"}
                                    onClick={() => navigate(`/employeeManagement/viewEmployee/${emp._id}`)}>View
                            </button>
                            <button className={"editBtn"}
                                    onClick={() => navigate(`/employeeManagement/editEmployee/${emp._id}`)}>Edit
                            </button>
                            <button className={"delBtn"} onClick={() => handleDelete(emp._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}