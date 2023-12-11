import axios from "axios";
import Config from "../Config";
const { APIKEY, BASEURL } = Config;

const publicHttp = axios.create({
  baseURL: `${BASEURL}/public/`,
  headers: {
    "api-key": APIKEY,
  },
});

const privateHttp = axios.create({
  baseURL: `${BASEURL}/private/`,
  headers: {
    "api-key": APIKEY,
  },
});

const setInterceptor = (instance, needToken) => {
  // request攔截器
  instance.interceptors.request.use(
    (config) => {
      if (localStorage.token && needToken === 1) {
        config.headers.Authorization = "Bearer " + localStorage.token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  // reponse攔截器
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            console.error("Not Login !");
            // 轉換網址
            break;
          default:
            break;
        }
        console.log(error.response.data.message);
      }

      return Promise.reject(error);
    }
  );
};

setInterceptor(publicHttp, 0);
setInterceptor(privateHttp, 1);

export default function (isToken, method, url, data = null, headers = null) {
  method = method.toLowerCase();
  if (headers != null && method === "post" && isToken === 1) {
    return privateHttp.post(url, data, headers);
  } else if (method === "post") {
    return isToken === 0
      ? publicHttp.post(url, data)
      : privateHttp.post(url, data);
  } else if (method === "get") {
    return isToken === 0
      ? publicHttp.get(url, data)
      : privateHttp.get(url, data);
  } else if (method === "delete") {
    return isToken === 0
      ? publicHttp.delete(url, data)
      : privateHttp.delete(url, data);
  } else if (method === "put") {
    return isToken === 0
      ? publicHttp.put(url, data)
      : privateHttp.put(url, data);
  } else {
    console.error("未知的method" + method);
    return false;
  }
}
