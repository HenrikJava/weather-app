import React from "react";
import "./Wind.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

export const Wind = (props) => {
  return (
    <div className="wind-wrapper">
      <p id={props.id}>
        {Math.round(props.speed)}
        {props.fahrenheitOn ? " mph" : " m/s"}
      </p>
      <ArrowRightAltIcon
        id={props.id}
        style={{
          transform: `rotateZ(${props.deg + 90}deg)`,
        }}
      />
    </div>
  );
};
