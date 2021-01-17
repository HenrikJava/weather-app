import axios from "axios";


export const searchCity = async (values) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(values);

  try {
    const response = await axios.post("/api/weather", body, config);
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


