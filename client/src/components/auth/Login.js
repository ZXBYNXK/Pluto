// COMPONENT

// Modules
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../redux/modules/auth";
import Spinner from "../layout/Spinner";

// Component
const Login = ({ login, loading, isAuthenticated }) => {
  // State with useState hook.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  // Event Handlers
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  // JSX
  return !loading ? (
    <section className="container card">
      <h1 className="large text-primary">Login</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          email
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
          <button className="btn-success p1">Submit</button>
        </div>
      </form>
      <p className="my-1">
        Dont have an account?{" "}
        <Link to="/register">
          <span className="hover">Register</span>
        </Link>
      </p>
    </section>
  ) : (
    <Spinner />
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mstp = ({ auth }) => ({
  loading: auth.loading,
  isAuthenticated: auth.isAuthenticated,
});
export default connect(mstp, { login })(Login);
