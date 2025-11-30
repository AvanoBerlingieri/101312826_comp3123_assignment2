import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeManagement from "./pages/EmployeeManagement";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import ViewDetails from "./pages/ViewDetails";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/employeeManagement" element={<EmployeeManagement/>}/>
                <Route path="/employeeManagement/createEmployee" element={<CreateEmployee/>}/>
                <Route path="/employeeManagement/editEmployee/:id" element={<EditEmployee/>}/>
                <Route path="/employees/:id" element={<ViewDetails/>} />
            </Routes>
        </BrowserRouter>
    );
}
