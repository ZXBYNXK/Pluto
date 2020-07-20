import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../redux/modules/profile";
import PropTypes from "prop-types";
import DashBoardActions from "./DashBoardActions";
import Spinner from "../layout/Spinner";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
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
        &nbsp; Welecome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashBoardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
          <button className="btn btn-danger" onClick={() => deleteAccount()}>Delete Account</button>
          <i className="fas fa user-mius"></i>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          Please create a profile <Link to="/create-profile">here</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mstp = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mstp, { getCurrentProfile, deleteAccount })(Dashboard);
