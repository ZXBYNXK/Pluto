import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import logo from "../../img/logo.png";
const Logo = ({ auth: { loading } }) =>
  loading ? (
    <Spinner />
  ) : (
    <img
      style={{ width: "4rem", borderRadius: "1rem" }}
      alt="Logo"
      src={logo}
    />
  );

Logo.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mstp = (state) => ({ auth: state.auth });

export default connect(mstp)(Logo);
