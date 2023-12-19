import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("Successful");
    const navigate = useNavigate();

    const handleRegistration = async () => {
        try {
            const response = await axios.post("http://localhost:3000/users", {
                user: {
                    email,
                    password,
                },
            });
            console.log("Registration successful:", response.data);
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // AxiosError extends Error and provides additional properties
                if (error.response && error.response.data && error.response.data.errors) {
                    // If the server returns specific errors, set them in the state
                    setError(error.response.data.errors.join(", "));
                } else {
                    // If there's a generic error, handle it accordingly
                    console.error("Error registering user:", error);
                }
            } else {
                // Handle non-Axios errors
                console.error("Non-Axios error:", error);
            }
        }
    };

    return (
        <div>
            <p style={{ color: "red" }}>{error}</p>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegistration}>Register</button>
        </div>
    );
};

export default SignUpForm;
