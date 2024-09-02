import React from "react";

import './EducationalDetails.css'
const EducationalDetails = (props) => {
  return (
    <>
    {/* <h1>Educational Details</h1> */}
      <div className="education-card">
        <div className="education-card-1">
            <h3>{props.stage}</h3>
        </div>
        <div className="education-card-2">
            <h4>{props.instituteName}</h4>
            <div>
            <h5>{props.session}</h5>
            <h6>{props.grade}</h6>
            </div>
        </div>
      </div>
    </>
  );
};

export default EducationalDetails;
