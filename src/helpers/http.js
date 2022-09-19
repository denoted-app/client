/* eslint-disable no-param-reassign */
import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    config.headers.common['Content-Type'] = 'application/json';
    config.headers.common.Accept = 'application/json';
    config.url = `${process.env.REACT_APP_SERVER_HOST}${config.url}`

    console.log(config);

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log(error)
    }

    return Promise.reject(error);
  },
);

export default axios;
