import {useState} from "react";
import {loginUser} from "../api/Login.js";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "./css/Login.css"
import {useAuth} from "../context/AuthContext";

export default function Login() {
    // State to hold form input values
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const {setAuthenticated} = useAuth();

    // hooks for navigation
    const navigate = useNavigate();

    // to set messages
    const [message, setMessage] = useState("");

    // Handle changes in input fields
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // client side validation
        if (!form.email) {
            setMessage("Please Fill In All Fields");
            return;
        }
        if (!form.password) {
            setMessage("Please Fill In All Fields");
            return;
        }

        // api call to login user
        const res = await loginUser(form);

        if (res.status) {
            // If login is successful, show message and navigate to employee management page
            setMessage("Login successful!");
            setAuthenticated(true);
            navigate("/employeeManagement");
        } else {
            setMessage(res.message || "Login failed");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={handleChange}
                    />
                    <button className={"loginBtn"} type="submit">Login</button>
                </form>

                <div className="signup-link">
                    <p>Don't have an account?</p>
                    <Link to="/signup">
                        <button className={"signupBtn"}>Go to Signup</button>
                    </Link>
                </div>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}
