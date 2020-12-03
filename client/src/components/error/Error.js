import React from "react";
import ErrorImage from '../../shared/images/404.jpg'
import './Error.css'
export const Error = () => {
 

 
  return (<div id="error-container"><div id="error-inner-container"><h1>Weather service is temporarely down</h1><img src={ErrorImage} id="error-image"/></div></div>)
}
