import React from "react";
import confusedSloth from '../../shared/images/sloths/confusedSloth.png'
import './Error.css'
export const Error = () => {
 

 
  return (<div id="error-container"><div id="error-inner-container"><h1>Weather service is temporarely down</h1><img src={confusedSloth} id="error-image" alt="error"/></div></div>)
}
