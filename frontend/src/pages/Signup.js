import {useState} from "react";
import {signupUser} from "../api/Signup";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/Signup.css";

export default function Signup() {
    // State to hold form input values
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    // nav hooks
    const navigate = useNavigate();

    // to set messages
    const [message, setMessage] = useState("");

    //handle input change and update state
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // client side validation
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

        // api call to create new user
        const res = await signupUser(form);

        if (res.status) {
            // If signup is successful, show message and move to login page
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
