import React, {useState} from "react";
import EmployeeForm from "../components/EmployeeForm";
import {createEmp} from "../api/CreateEmployee.js";
import "./css/CreateEmployee.css"

export default function CreateEmployee() {

    // State to store the input values for a new employee
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

    // Handles changes in form inputs and updates the state
    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value // Update the field that changed
        });
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call API to create a new employee with the current state
            const data = await createEmp(employee);

            if (data.status) {
                setMessage("Employee created successfully!");

                // Reset form fields to empty
                setEmployee({
                    first_name: "",
                    last_name: "",
                    email: "",
                    position: "",
                    salary: "",
                    department: ""
                });

            } else {
                // if api error
                setMessage(data.message || "Error creating employee.");
            }
        } catch (err) {
            // if network error or other errors
            console.error(err);
            setMessage("Network error.");
        }
    };

    return (
        <div className="create-employee-container">
            <div className="create-employee-card">
                <h2>Create Employee</h2>

                <EmployeeForm
                    employee={employee} // Pass current employee state
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    buttonText="Create Employee"
                />

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}