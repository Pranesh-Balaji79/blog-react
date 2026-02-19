import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("loggedIn") === "true";

  const logout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark premium-nav">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          ✨ ProBlog
        </Link>

        <div className="d-flex gap-2 flex-wrap">
          <Link className="btn btn-outline-light btn-sm" to="/">
            Home
          </Link>

          <Link className="btn btn-outline-light btn-sm" to="/dashboard">
            Dashboard
          </Link>

          {!isAuth ? (
            <>
              <Link className="btn btn-warning btn-sm" to="/login">
                Login
              </Link>
              <Link className="btn btn-info btn-sm" to="/register">
                Register
              </Link>
            </>
          ) : (
            <button onClick={logout} className="btn btn-danger btn-sm">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
