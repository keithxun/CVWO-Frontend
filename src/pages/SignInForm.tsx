import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await axios.post("http://localhost:3000/users/sign_in", {
                user: {
                    email,
                    password,
                },
            });
            console.log("Sign In successful:", response.data);
            navigate("/");
        } catch (error) {
            console.error("Error signing in:", error);
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
            <button onClick={handleSignIn}>Sign in</button>
        </div>
    );
};

export default SignInForm;
