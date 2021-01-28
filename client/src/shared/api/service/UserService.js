import axios from "axios";

import { setAuthToken } from "../../global/functions";

export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const response = await axios.get("/api/auth");
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    localStorage.removeItem("token");
    return error.response.data.message
      ? error.response
      : {
          data: {
            message: {
              msgBody: "Something wrong at server, please try again later.",
              msgError: true,
            },
          },
        };
  }
};

export const registerUser = async (values) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(values);

  try {
    const response = await axios.post("/api/user", body, config);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      return response;
    }
  } catch (error) {
    console.log(error.response);
    localStorage.removeItem("token");
    return error.response.data.message
      ? error.response
      : {
          data: {
            message: {
              msgBody: "Something wrong at server, please try again later.",
              msgError: true,
            },
          },
        };
  }
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
  if (values.password === "") {
    delete values.password
  }
  if (values.oldPassword === "") {
    delete values.oldPassword
  }
  const body = JSON.stringify(values);

  try {
    const response = await axios.put("/api/user", body, config);
    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);

      return response;
    }
  } catch (error) {
    console.log(error.response);
    return error.response.data.message
      ? error.response
      : {
          data: {
            message: {
              msgBody: "Something wrong at server, please try again later.",
              msgError: true,
            },
          },
        };
  }
};
export const loginUser = async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post("/api/auth", body, config);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      setAuthToken(localStorage.token);
      return response;
    }
  } catch (error) {
    localStorage.removeItem("token");
    return error.response.data.message
      ? error.response
      : {
          data: {
            message: {
              msgBody: "Something wrong at server, please try again later.",
              msgError: true,
            },
          },
        };
  }
};
export const deleteUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const response = await axios.delete("/api/user");
    if (response.status === 200) {
      localStorage.removeItem("token");

      return response;
    }
  } catch (error) {
    return error.response.data.message
      ? error.response
      : {
          data: {
            message: {
              msgBody: "Something wrong at server, please try again later.",
              msgError: true,
            },
          },
        };
  }
};
export const updateUserPhoto = async (image) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.put("/api/user/photo", image, config);
    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
console.log(response);
      return response;
    }
  } catch (error) {
    console.log(error.response);
    return error.response.data.message
      ? error.response
      : {
          data: {
            message: {
              msgBody: "Something wrong at server, please try again later.",
              msgError: true,
            },
          },
        };
  }
};
export const updateUserSettings = async (values) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(values);
  try {
    const response = await axios.put("/api/user/settings", body, config);
    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      return response;
    }
  } catch (error) {
    console.log(error.response);
    return error.response.data.message
      ? error.response
      : {
          data: {
            message: {
              msgBody: "Something wrong at server, please try again later.",
              msgError: true,
            },
          },
        };
  }
};
export const forgotPasswordUser = async (email) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(email);

  try {
    const response = await axios.post("/api/user/forgot", body, config);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error.response);
    return error.response.data.message
      ? error.response
      : {
          data: {
            message: {
              msgBody: "Something wrong at server, please try again later.",
              msgError: true,
            },
          },
        };
  }
};
export const checkTokenUser = async (token) => {
  const config = {
    headers: {'x-auth-token': token}
  }

  try {
    const response = await axios.get("/api/user/reset-check-token",config);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return error.response.data.message
      ? error.response
      : {
          data: {
            message: {
              msgBody: "Something wrong at server, please try again later.",
              msgError: true,
            },
          },
        };
  }
};
export const updatePasswordUser = async (values, token) => {
  
  setAuthToken(token);
  const config = {
    headers: {

    'Content-Type': 'application/json'
  }}
const body = JSON.stringify(values)
try {
const response = await axios.put('/api/user/reset-update-password', body, config)
if (response.status === 201) {
  return response
}
}catch (error) {
return error.response.data.message ? error.response :
{
  data: {
    message: {
      msgBody: "Something wrong at server, please try again later.",
      msgError: true,
    },
  },
};
}
}
