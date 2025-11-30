import React, { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useParams } from "react-router-dom";
import "./css/EditEmployee.css";

import { getEmpById } from "../api/GetEmployeeById";
import { editEmp } from "../api/EditEmployee";

export default function EditEmployee() {
    // get the employee id from the url parameters
    const { id } = useParams();

    // State to store the employee's current data and prefill the form
    const [employee, setEmployee] = useState({
        first_name: "",
        last_name: "",
        email: "",
        position: "",
        salary: "",
        department: ""
    });

    // State to store messages after form submission
    const [message, setMessage] = useState("");

    // Load employee data into form
    useEffect(() => {
        getEmpById(id)// api call to get employee
            .then(data => {
                setEmployee(data.employee); // Prefill the form
            })
            .catch(err => console.error(err)); // log errors
    }, [id]);

    // Handles changes in form inputs and updates the state
    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value // update the field that changed
        });
    };

    // handles the form submission to update employee
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // api call to edit employee
            const data = await editEmp(id, employee);

            // setting messages
            if (data.status) {
                setMessage("Employee updated successfully!");
            } else {
                setMessage(data.message || "Error updating employee.");
            }
        } catch (err) {
            // catch errors
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
