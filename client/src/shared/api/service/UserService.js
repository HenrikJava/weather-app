import axios from "axios";

import {setAuthToken} from '../../global/functions'

export const loadUser = async () => {
  
  if (localStorage.token) {
setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/api/auth')
    return res

  } catch(err) {
    localStorage.removeItem("token");
      return null


  } 
}


export const registerUser = async (values) => {
  
  
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(values);
  try {
    const res = await axios.post("/api/user", body, config);
    if (res.status === 200) {
      
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

export const updateUser = async (values) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
      }
  
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(values);
  console.log(body);
  try {
    const res = await axios.put("/api/user", body, config);
    if (res.status === 201) {
      console.log('sad');
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
export const loginUser = async (email, password) => {
  
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({email, password});
  try {
    const res = await axios.post("/api/auth", body, config);
    if (res.status === 200) {
      
      localStorage.setItem("token", res.data.token);
      setAuthToken(localStorage.token);
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
