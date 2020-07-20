import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import PropTypes from "prop-types";
import { deleteEducation } from "../../redux/modules/profile";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <ti key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <Moment fomat="YYYY/MM/DD">{moment.utc(edu.from)}</Moment>
      <td>
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment fomat="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td>
        {" "}
        <button
          className="btn btn-danger"
          onClick={() => deleteEducation(edu._id)}
        >
          Delete
        </button>
      </td>
    </ti>
  ));
  return (
    <div>
      <h2 className="my-2">education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
