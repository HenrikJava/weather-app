import React, { useState, createContext } from "react";

export const DisplayCurrentContext = createContext();
export const DisplayCurrentProvider = (props) => {
  const [displayCurrent, setDisplayCurrent] = useState(true);
  const [weekday, setWeekday] = useState();

  return (
    <DisplayCurrentContext.Provider
      value={[displayCurrent, setDisplayCurrent, weekday, setWeekday]}
    >
      {props.children}
    </DisplayCurrentContext.Provider>
  );
};
