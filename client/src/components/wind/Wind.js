import React from "react";
import "./Wind.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

export const Wind = (props) => {
  return (
    <div className="wind">
      <p className={props.className}>
        {Math.round(props.speed)}
        {props.fahrenheitOn ? " mph" : " m/s"}
      </p>
      <ArrowRightAltIcon
       className={props.className}
        style={{
          transform: `rotateZ(${props.deg + 90}deg)`,
        }}
      />
    </div>
  );
};
