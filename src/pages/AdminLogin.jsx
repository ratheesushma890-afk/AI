import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();


    if (email === "tannu@gmail.com" && password === "tannu123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin-secret/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-logo">✈️</div>

        <h1>Travel Admin</h1>
        <p>Welcome back, Admin</p>

        <form onSubmit={handleLogin}>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <span className="admin-error">{error}</span>}

          <button type="submit">
            Login to Dashboard
          </button>

        </form>

      </div>
    </div>
  );
}