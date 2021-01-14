import React from "react";
import confusedSloth from "../shared/images/sloths/confusedSloth.png";
import "./ErrorView.css";
export const ErrorView = () => {
  return (
    <div className="error-view">
      <div className="error-image-wrapper">
        <h1>Weather service is temporarely down</h1>
        <img src={confusedSloth} className="error-image" alt="error" />
      </div>
    </div>
  );
};
