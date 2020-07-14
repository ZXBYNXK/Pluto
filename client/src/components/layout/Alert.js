import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(({ id, type, msg }) => (
    <div key={id} className={`alert alert-type${type}`}>
      {msg}
    </div>
  ));
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mstp = (state) => ({ alerts: state.alerts });
export default connect(mstp)(Alert);
