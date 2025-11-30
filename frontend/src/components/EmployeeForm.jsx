import React from "react";
import {Link} from "react-router-dom";

const EmployeeForm = ({employee, onChange, onSubmit, buttonText}) => {
    return (
        <form onSubmit={onSubmit} className="employee-form">

            <input
                name="first_name"
                placeholder="First Name"
                value={employee.first_name}
                onChange={onChange}
            />

            <input
                name="last_name"
                placeholder="Last Name"
                value={employee.last_name}
                onChange={onChange}
            />

            <input
                name="email"
                placeholder="Email"
                type="email"
                value={employee.email}
                onChange={onChange}
            />

            <input
                name="position"
                placeholder="Position"
                value={employee.position}
                onChange={onChange}
            />

            <input
                name="salary"
                placeholder="Salary"
                type="number"
                value={employee.salary}
                onChange={onChange}
            />

            <input
                name="department"
                placeholder="Department"
                value={employee.department}
                onChange={onChange}
            />

            <button type="submit">{buttonText}</button>
            <Link to="/employeeManagement">
                <button className={"backBtn"}>Back</button>
            </Link>
        </form>
    );
};

export default EmployeeForm;
