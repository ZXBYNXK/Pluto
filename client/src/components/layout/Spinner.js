import React, { Fragment } from "react";
import spinner from "../../img/spinner.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{minWidth:"2rem", maxWidth:"3rem", borderRadius:"1rem" }}
      alt="Loading..."
    />
  </Fragment>
);
