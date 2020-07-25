import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/modules/auth";
import Logo from "./Logo";
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const guestLinks = (
    <ul>
      <li>
        <Link to="/#">Developers</Link>
      </li>

      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul>
      <li>
        <Link to="/#">Developers</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <span onClick={() => logout()}>Logout</span>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <Link to="/">
        <Logo />
      </Link>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mstp = (state) => ({
  auth: state.auth,
});

export default connect(mstp, { logout })(Navbar);
