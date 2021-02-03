import React, { useContext } from "react";
import { AppContext } from "../shared/global/provider/Provider";
import confusedSloth from "../shared/images/sloths/confusedSloth.png";
import "./ErrorView.css";
export const ErrorView = () => {
  const app = useContext(AppContext)
  return (
    <div className="error-view">
      <div className="error-image-wrapper">
        <h1>
          {app.swedish
            ? "Just nu kan vädret inte hämtas"
            : "Weather service is temporarely down"}
        </h1>
        <img src={confusedSloth} className="error-image" alt="error" />
      </div>
    </div>
  );
};
