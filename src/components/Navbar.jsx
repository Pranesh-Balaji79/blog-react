import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
  }, [dark]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">🚀 ProBlog</Link>

        <div className="d-flex gap-2 flex-wrap">
          <Link className="btn btn-outline-light btn-sm" to="/">Home</Link>
          <Link className="btn btn-outline-light btn-sm" to="/dashboard">Dashboard</Link>

          {!user ? (
            <>
              <Link className="btn btn-warning btn-sm" to="/login">Login</Link>
              <Link className="btn btn-info btn-sm" to="/register">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="btn btn-danger btn-sm">
              Logout
            </button>
          )}

          <button
            onClick={() => setDark(!dark)}
            className="btn btn-secondary btn-sm"
          >
            🌙
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
