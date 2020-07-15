import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-frog"></i> Pluto
        </Link>
      </h1>

      <ul>
        <li>
          <Link to="!#">Developers</Link>
        </li>

        {!isAuthenticated ? (
          <li>
            <Link to="/register">Register</Link>
          </li>
        ) : null}

        {!isAuthenticated ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};
const mapStateToProps = ({ auth }) => ({ isAuthenticated: auth.isAuthenticated });
export default connect(mapStateToProps)(Navbar);
