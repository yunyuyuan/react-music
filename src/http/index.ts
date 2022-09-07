import axios, { AxiosRequestConfig } from "axios";

/**
 * axios with hostname and response code checking.
 */
export function myAxios<T = any>(config: AxiosRequestConfig) {
  return new Promise<T>((resolve, reject) => {
    axios({
      ...config,
      url: `${import.meta.env.VITE_API_URL}${config.url}`,
      method: config.method || "get",
    })
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

/**
 * axios request that only take the last response.
 */
export function atomAxios() {
  let timestamp = 0;
  return (config: AxiosRequestConfig) => {
    return new Promise<{ dirty: boolean; data?: any }>((resolve, reject) => {
      const now = Date.now();
      timestamp = now;
      myAxios(config)
        .then((res) => {
          if (now === timestamp) {
            resolve({
              dirty: false,
              data: res,
            });
          } else {
            throw new Error();
          }
        })
        .catch((reason) => {
          if (now === timestamp) {
            reject(reason);
          } else {
            resolve({
              dirty: true,
            });
          }
        });
    });
  };
}
