import {useState} from "react";
import {signupUser} from "../api/Signup";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/Signup.css";

export default function Signup() {
    const [form, setForm] = useState({
        username: "",
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

        if (!form.username) {
            setMessage("Please Fill In All Fields");
            return;
        }
        if (!form.email) {
            setMessage("Please Fill In All Fields");
            return;
        }
        if (!form.password) {
            setMessage("Please Fill In All Fields");
            return;
        }

        const res = await signupUser(form);

        if (res.status) {
            setMessage("Signup successful!");
            navigate("/");
        } else {
            setMessage(res.message || "Error signing up");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Signup</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={handleChange}
                    />
                    <button type="submit">Sign Up</button>
                </form>

                <div className="login-link">
                    <p>Already have an account?</p>
                    <Link to="/">
                        <button>Back to Login</button>
                    </Link>
                </div>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}
