import React from "react";

import './EducationalDetails.css'
const EducationalDetails = (props) => {
  return (
    <>
    {/* <h1>Educational Details</h1> */}
      <div className="education-card">
        <div className="education-card-1">
            <h2>{props.stage}</h2>
        </div>
        <div className="education-card-2">
            <h3>{props.instituteName}</h3>
            <h4>{props.session}</h4>
            <h5>{props.grade}</h5>
        </div>
      </div>
    </>
  );
};

export default EducationalDetails;
