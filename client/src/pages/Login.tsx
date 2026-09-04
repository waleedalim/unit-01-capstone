import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


function Login(){
    const [email, setEmail] = useState("");
    const [password, setPwd] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        setError("");
        try{
            const res = await api.post("/users/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err: any){
            setError(err.response?.data?.err || "Login failed");
        }
    }

    return(
        <div>
            <h1> Welcome Back!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    />
                    <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Login;