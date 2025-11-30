import React, {useState} from "react";
import EmployeeForm from "../components/EmployeeForm";
import {createEmp} from "../api/CreateEmployee.js";
import "./css/CreateEmployee.css"

export default function CreateEmployee() {

    const [employee, setEmployee] = useState({
        first_name: "",
        last_name: "",
        email: "",
        position: "",
        salary: "",
        department: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await createEmp(employee);

            if (data.status) {
                setMessage("Employee created successfully!");

                setEmployee({
                    first_name: "",
                    last_name: "",
                    email: "",
                    position: "",
                    salary: "",
                    department: ""
                });

            } else {
                setMessage(data.message || "Error creating employee.");
            }
        } catch (err) {
            console.error(err);
            setMessage("Network error.");
        }
    };

    return (
        <div className="create-employee-container">
            <div className="create-employee-card">
                <h2>Create Employee</h2>

                <EmployeeForm
                    employee={employee}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    buttonText="Create Employee"
                />

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}