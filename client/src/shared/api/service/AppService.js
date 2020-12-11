import axios from "axios";

import {setAuthToken} from '../../global/functions'

export const updateApp = async (values) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
        }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(values);
    try {
      const res = await axios.put("/api/app", body, config);
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        return res
      } else {
        localStorage.removeItem("token");
        return null
  
      }
    } catch (err) {
      console.log(err);
    }
    return null
  };