import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => (
  <div style={{display:"flex", position:"absolute", width: "100vw"}}>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map(({ id, type, msg }) => (
            <div key={id} style={{color: "red", textAlign: "center",  position:"absolute" }}>
              {msg}
            </div>
        ))}
  </div>
);
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mstp = (state) => ({ alerts: state.alert });
export default connect(mstp)(Alert);
