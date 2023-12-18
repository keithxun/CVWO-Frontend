import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegistration = async () => {
        try {
            const response = await axios.post("http://localhost:3000/users/sign_up", {
                user: {
                    email,
                    password,
                },
            });
            console.log("Registration successful:", response.data);
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    return (
        <div>
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
