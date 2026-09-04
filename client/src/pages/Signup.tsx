import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPwd] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        setError("");
        try{
            const res = await api.post("/users/signup", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err: any){
            setError(err.response?.data?.err || "Signup failed");
        }
    }

    return(
        <div className="page-container" style={{ maxWidth: "400px" }}>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Create Account</button>
            </form>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
}

export default Signup;