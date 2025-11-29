import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeManagement from "./pages/EmployeeManagement";
import CreateEmployee from "./pages/CreateEmployee";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/employeeManagement" element={<EmployeeManagement/>}/>
                <Route path="/employeeManagement/createEmployee" element={<CreateEmployee/>}/>
            </Routes>
        </BrowserRouter>
    );
}
