import axios, { AxiosRequestConfig } from "axios";

export async function myAxios(config: AxiosRequestConfig) {
  return axios({
    ...config,
    url: `${import.meta.env.VITE_API_URL}${config.url}`,
    method: config.method || "get",
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
              data: res.data,
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
