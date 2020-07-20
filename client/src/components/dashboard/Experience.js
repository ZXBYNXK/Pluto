import React from "react";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteExperience } from "../../redux/modules/profile";
const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <ti key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
      
      <Moment fomat="YYYY/MM/DD">{moment.utc(exp.from)}</Moment>
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment fomat="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
        )}
      </td>
      <td>
        {" "}
        <button
          className="btn btn-danger"
          onClick={() => deleteExperience(exp._id)}
        >
          Delete
        </button>
      </td>
    </ti>
  ));
  return (
    <div>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
