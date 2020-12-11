import axios from "axios";

import { setAuthToken } from "../../global/functions";

export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    return res;
  } catch (err) {
    localStorage.removeItem("token");
    return null;
  }
};

export const registerUser = async (values) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  delete values.confirmPassword;
  const body = JSON.stringify(values);

  return axios
    .post("/api/user", body, config)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        return response;
      }
    })
    .catch((error) => {
      console.log(error.response);
      localStorage.removeItem("token");

      return error.response.data.message? error.response : {data: {message: { msgBody: "Something wrong at server, please try again later.", msgError: true }}};
    });
};

export const updateUser = async (values) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
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
      localStorage.setItem("token", res.data.token);
      return res;
    } else {
      localStorage.removeItem("token");
      return null;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};
export const loginUser = async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      setAuthToken(localStorage.token);
      return res;
    } else {
      localStorage.removeItem("token");
      return null;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};
