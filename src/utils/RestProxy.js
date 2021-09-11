import axios from "axios";

const apiSecret = "";
const version = "v1";
const baseURL = `https://dummyapi.io/data/${version}/`;

const requestTypes = {
  GET: "GET",
  DELETE: "DELETE",
  POST: "POST",
  PUT: "PUT"
};

const Request = axios.create({
  baseURL,
  headers: { "content-type": "application/json", "app-id": apiSecret }
});

const Api = options => {
  const onSuccess = response => {
    // eslint-disable-next-line no-console
    console.debug("Request Successful!", response);
    return response.data;
  };

  const onError = error => {
    if (error.response) {
      // eslint-disable-next-line no-console
      console.debug("Request Successful!", error.response);
    }

    return Promise.reject(error.response || error.message);
  };

  return Request(options)
    .then(onSuccess)
    .catch(onError);
};

export { Api, requestTypes, version };
