import React, { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useParams } from "react-router-dom";
import "./css/EditEmployee.css";

import { getEmpById } from "../api/GetEmployeeById";
import { editEmp } from "../api/EditEmployee";

export default function EditEmployee() {
    const { id } = useParams();

    const [employee, setEmployee] = useState({
        first_name: "",
        last_name: "",
        email: "",
        position: "",
        salary: "",
        department: ""
    });

    const [message, setMessage] = useState("");

    // Load employee data into form
    useEffect(() => {
        getEmpById(id)
            .then(data => {
                setEmployee(data.employee); // Prefill the form
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await editEmp(id, employee);

            if (data.status) {
                setMessage("Employee updated successfully!");
            } else {
                setMessage(data.message || "Error updating employee.");
            }
        } catch (err) {
            console.error(err);
            setMessage("Network error.");
        }
    };

    return (
        <div className="edit-employee-container">
            <div className="edit-employee-card">
                <h2>Update Employee</h2>

                <EmployeeForm
                    employee={employee}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    buttonText="Update Employee"
                />

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}
