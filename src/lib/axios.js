// axios
//   .post(url, data, {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//   })
//   .then(({data}) => {
//     console.log(data);
// });

import axios from "axios"

const axi = {
    get: (url) => {
        return axios.get(url);
    },
    post: (url, data) => {
        return axios.post(url, data);
        // return axios.post(url, data);
    },
    delete: (url) => {
        return axios.delete(url);
    }
}

export { axi }