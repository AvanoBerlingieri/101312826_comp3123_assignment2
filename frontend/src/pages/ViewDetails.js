import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmpById } from "../api/GetEmployeeById";
import "./css/ViewDetails.css";

export default function ViewDetails() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getEmpById(id)
            .then(data => setEmployee(data.employee))
            .catch(err => setError(err.message));
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!employee) return <p>Loading...</p>;

    return (
        <div className="view-employee-container">
            <div className="view-employee-card">
                <h2>Employee Details</h2>

                <p><strong>First Name:</strong> {employee.first_name}</p>
                <p><strong>Last Name:</strong> {employee.last_name}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Salary:</strong> ${employee.salary}</p>
                <p><strong>Department:</strong> {employee.department}</p>

                <Link to="/employeeManagement">
                    <button className="backBtn">Back to Employee Management</button>
                </Link>
            </div>
        </div>
    );
}
