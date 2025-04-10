import React, { useState } from 'react';
import axios from 'axios';
import './LoginAdmin.css';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/admin/login", { username, password });
            const { token } = response.data;

            localStorage.setItem("admin_token", token);
            localStorage.setItem("role", "admin");

            navigate("/admin/pengajuanlist");
            window.location.reload(); // untuk refresh role & sidebar
        } catch (err) {
            setError("Login gagal. Username atau password salah.");
        }
    };

    return (
        <div className="login-container" style={{ padding: "2rem" }}>
            <h2>Login Admin</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mt-2">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
                <button type="submit" className="btn btn-primary mt-3">Login</button>
            </form>
        </div>
    );
};

export default LoginAdmin;
