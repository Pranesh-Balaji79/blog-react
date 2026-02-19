import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("loggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: 400 }}>
      <h3 className="fw-bold mb-3 text-center">Login</h3>

      <form onSubmit={handleLogin}>
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

        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
