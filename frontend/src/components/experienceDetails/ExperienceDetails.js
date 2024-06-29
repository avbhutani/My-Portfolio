import React from "react";

import './ExperienceDetails.css'
const ExperienceDetails = (props) => {
  return (
    <>
    {/* <h1>Educational Details</h1> */}
      <div className="experience-card">
        <div className="experience-card-1">
            <h2>{props.position}</h2>
        </div>
        <div className="experience-card-2">
            <h3>{props.companyName}</h3>
            <h4>{props.duration}</h4>
            <h5>{props.location}</h5>
            <button>View Responsibilities</button>
        </div>
      </div>
    </>
  );
};

export default ExperienceDetails;
