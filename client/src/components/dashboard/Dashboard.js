import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/modules/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
const Dashboard = ({
  auth: {user},
  getCurrentProfile,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Welecome {user && user.name}
      </p>
      {profile !== null ? <Fragment>Has</Fragment> : <Fragment>Please create a profile <Link to="/create-profile">here</Link></Fragment>}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mstp = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mstp, { getCurrentProfile })(Dashboard);
