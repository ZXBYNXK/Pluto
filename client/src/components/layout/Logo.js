import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import logo from "../../img/logo.png";
const Logo = ({ loading }) =>
  loading ? (
    <div style={{ display: "flex" }}>
      <Spinner />
      <span style={{ fontSize: "2rem" }}>Pluto</span>
    </div>
  ) : (
    <div style={{ display: "flex" }}>
      <img
        style={{ minWidth: "2rem", maxWidth: "3rem", borderRadius: "1rem" }}
        alt="Logo"
        src={logo}
      />
      <span style={{ fontSize: "2rem" }}>Pluto</span>
    </div>
  );

Logo.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mstp = (state) => ({ loading: state.auth.loading });

export default connect(mstp)(Logo);
