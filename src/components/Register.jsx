import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: 400 }}>
      <h3 className="fw-bold mb-3 text-center">Register</h3>

      <form onSubmit={handleRegister}>
        <input
          className="form-control mb-3"
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Register;
