import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => (
  <div style={{ display: "flex", width: "100%" }}>
    <Fragment>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map(({ id, type, msg }) => (
            <div key={id} className={`alert alert-type${type}`}>
              {msg}
            </div>
        ))}
    </Fragment>
  </div>
);
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mstp = (state) => ({ alerts: state.alert });
export default connect(mstp)(Alert);
