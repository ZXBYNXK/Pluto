import React, { Fragment } from "react";
import spinner from "../../img/spinner.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{width:"4rem", borderRadius:"1rem" }}
      alt="Loading..."
    />
  </Fragment>
);
