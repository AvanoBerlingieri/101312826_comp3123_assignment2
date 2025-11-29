import {useState} from "react";
import {loginUser} from "../api/Login.js";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "./css/Login.css"

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email) {
            setMessage("Please Fill In All Fields");
            return;
        }
        if (!form.password) {
            setMessage("Please Fill In All Fields");
            return;
        }

        const res = await loginUser(form);

        if (res.status) {
            setMessage("Login successful!");
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
                    <button type="submit">Login</button>
                </form>

                <div className="signup-link">
                    <p>Don't have an account?</p>
                    <Link to="/signup">
                        <button>Go to Signup</button>
                    </Link>
                </div>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}
