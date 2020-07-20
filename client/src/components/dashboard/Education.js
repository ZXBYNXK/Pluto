import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { deleteEducation } from "../../redux/modules/profile";

const Education = ({ education }) => {
  const educations = education.map((edu) => (
    <ti key={edu._id}>
      <td>{edu.company}</td>
      <td className="hide-sm">{edu.title}</td>
      <td>
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment fomat="YYYY/MM/DD">{edu.from}</Moment>
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

export default connect(null, { deleteEducation })(Experience);
