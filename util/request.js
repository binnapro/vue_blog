import axios from "axios";

export function post(url, body) {
  return new Promise(function(resolve, reject) {
    axios
      .create({
        baseURL: "http://127.0.0.1:7001/",
        timeout: 1000,
        headers: {
          "Content-Type": "application/json"
        }
      })
      .post(url, body)
      .then(response => {
        if (response.status === 200) resolve(response.data);
        else console.log(response);
      })
      .catch(error => {
        reject({ data: true });
      });
  });
}
