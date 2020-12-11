import React from "react";
import "./Wind.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

export const Wind = (props) => {
  return (
    <div id="wind">
      <p id="speed">
        {Math.round(props.speed)}
        {props.fahrenheitOn ? " mph" : " m/s"}
      </p>
      <ArrowRightAltIcon
        id="arrow"
        style={{
          transform: `rotateZ(${props.deg + 90}deg)`,
        }}
      />
    </div>
  );
};
