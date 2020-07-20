import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const Experience = ({ experience }) => {
  const experiences = experience.map((exp) => (
    <ti key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment fomat="YYYY/MM/DD">{exp.from}</Moment>
        )}
      </td>
      <td>
        {" "}
        <button className="btn btn-danger">Delete</button>
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
};

export default Experience;
