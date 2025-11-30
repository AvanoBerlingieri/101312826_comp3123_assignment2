const express = require("express")
const EmployeesModel = require("../models/employees")
const { authGuard } = require("../auth/authMiddleware");
const routes = express.Router()

// all routes require authentication
routes.use(authGuard);

// get all employees
routes.get("/emp/employees", (req, res) => {
    EmployeesModel.find().then((employees) => {

        // validate if employees exist
        if (!employees || employees.length === 0) {
            return res.status(404).send({
                status: false,
                message: "No employees found"
            })
        }
        res.status(200).send({
            status: true,
            message: "Got all employees successfully",
            count: employees.length,
            employees: employees
        })
    }).catch((err) => {
        res.status(500).send({
            status: false,
            message: "Error finding employees",
            error: err.message
        })
    })
})

// create employee
routes.post("/emp/employees", (req, res) => {
    const employeeData = req.body;

    // validate if all info is filled out
    if (!employeeData.first_name || !employeeData.last_name || !employeeData.email || !employeeData.position || !employeeData.salary || !employeeData.department) {
        return res.status(400).send({
            status: false,
            message: "All fields are required.",
        })
    }

    // check if employee already exists
    EmployeesModel.findOne({email: employeeData.email}).then((existingEmployee) => {
        if (existingEmployee) {
            return res.status(400).send({
                status: false,
                message: "Employee with this email already exists"
            })
        }

        const newEmployee = new EmployeesModel(employeeData);

        // save employee to database
        newEmployee.save().then((employee) => {
            res.status(201).send({
                status: true,
                message: "Employee created successfully",
                employee: employee
            })
        }).catch((err) => {
            res.status(500).send({
                status: false,
                message: "Error saving employee",
                error: err.message
            })
        })
    }).catch((err) => {
        res.status(500).send({
            status: false,
            message: "Error checking existing employee",
            error: err.message
        })
    })
})

// get employee by id
routes.get("/emp/employees/:eid", (req, res) => {
    EmployeesModel.findById(req.params.eid)
        .then((employee) => {

            // validate if employee exists
            if (!employee) {
                return res.status(404).send({
                    status: false,
                    message: "Employee not found"
                })
            }
            res.status(200).send({
                status: true,
                message: "Employee found",
                employee: employee
            })
        }).catch((err) => {
        res.status(500).send({
            status: false,
            message: "Error finding employee",
            error: err.message
        })
    })
})

// update employee
routes.put("/emp/employees/:eid", (req, res) => {
    EmployeesModel.findByIdAndUpdate(req.params.eid, req.body, {new: true}).then((employee) => {

        // validate if employee exists
        if (!employee) {
            return res.status(404).send({
                status: false,
                message: "Employee not found"
            })
        }
        res.status(200).send({
            status: true,
            message: "Employee updated successfully",
            employee: employee
        })
    }).catch((err) => {
        res.status(500).send({
            status: false,
            message: "Can't update employee",
            error: err.message
        })
    })
})

// delete employee
routes.delete("/emp/employees/:eid", (req, res) => {
    EmployeesModel.findByIdAndDelete(req.params.eid).then((employee) => {

        // validate if employee exists
        if (!employee) {
            return res.status(404).send({
                status: false,
                message: "Employee not found"
            })
        }
        res.status(200).send({
            status: true,
            message: "Employee deleted successfully",
            employee: employee
        })
    }).catch((err) => {
        res.status(500).send({
            status: false,
            message: "Error trying to delete employee",
            error: err.message
        })
    })
})

module.exports = routes