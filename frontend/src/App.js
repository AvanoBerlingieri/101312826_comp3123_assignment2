import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import RedirectRoute from "./components/redirectRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeManagement from "./pages/EmployeeManagement";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import ViewDetails from "./pages/ViewDetails";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/employeeManagement" element={<RedirectRoute><EmployeeManagement/></RedirectRoute>}/>
                    <Route path="/employeeManagement/createEmployee"
                           element={<RedirectRoute><CreateEmployee/></RedirectRoute>}/>
                    <Route path="/employeeManagement/editEmployee/:id"
                           element={<RedirectRoute><EditEmployee/></RedirectRoute>}/>
                    <Route path="/employeeManagement/viewEmployee/:id"
                           element={<RedirectRoute><ViewDetails/></RedirectRoute>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
